let DBUtils = require('../utils/DBUtils');
let Condition = require('../utils/Condition');
let iDGenerator = require('../utils/IDGenerator');
let setting = require('../../config/setting.js');
let Page = require('../utils/Page');

/**
 * BaseDao只支持MySQL
 * 实现类可配置参数如下：
 * tableName：表名，BaseDao所有直接操作都将操作该表
 * primaryKey：表的主键名
 * autoPK：主键是否为自增长，如false则使用IDGenerator的增长策略（uuid）
 */
class BaseDao {

    constructor(options) {
        this.tableName = options.tableName;
        this.primaryKey = options.primaryKey || "id";
        this.autoPK = options.autoPK || false;
    }

    getConnection() {
        return DBUtils.getConnection();
    }

    beginTransaction() {
        return new Promise((resolve, reject) => {
            this.getConnection().then(conn => {
                conn.beginTransaction(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(conn);
                    }
                });
            }).catch(err => reject(err));
        });
    }

    commit(connection) {
        return new Promise((resolve, reject) => {
            connection.commit(err => {
                if (err) {
                    reject(err);
                } else {
                    connection.release();
                    resolve(true);
                }
            });
        });
    }

    rollback(connection) {
        return new Promise((resolve, reject) => {
            connection.rollback(err => {
                if (err)
                    reject(err);
                else {
                    connection.release();
                    resolve(true);
                }
            });
        });
    }

    selectBySql(sql, condition, connection) {
        return this.query(`${sql} ${condition ? condition.toSql() : ''}`, condition && condition.toValue(), connection);
    }

    async pageSelectBySql(sql, condition, pageNum = 1, pageSize = setting.defaultPageSize, connection) {
        pageNum = pageNum || 1;
        pageSize = pageSize || setting.defaultPageSize;

        sql = sql + (condition ? ` ${condition.toSql()}` : '');
        let values = condition && condition.toValue();

        let countSql = `select count(1) cnt from (${sql}) tmp`;
        let count = await this.query(countSql, values, connection);

        let start = (pageNum - 1) * pageSize;
        let dataSql = `${sql} limit ?, ?`;
        if (!values) values = [];
        let data = await this.query(dataSql, [...values, start, pageSize], connection);

        let page = new Page(pageNum, pageSize);
        page.setRecordCount(count[0].cnt);
        page.setData(data);
        return page;
    }

    selectAll(connection) {
        return this.query(`select * from ${this.tableName}`, null, connection);
    }

    pageSelectAll(pageNum = 1, pageSize = setting.defaultPageSize, connection) {
        return this.pageSelectList(null, pageNum, pageSize, connection);
    }

    selectOne(id, connection) {
        return this.query(`select * from ${this.tableName} where ${this.primaryKey} = ?`, id, connection);
    }

    selectList(condition, connection) {
        return this.query(`select * from ${this.tableName} ${condition ? condition.toSql() : ''}`,
            condition && condition.toValue(), connection);
    }

    pageSelectList(condition, pageNum = 1, pageSize = setting.defaultPageSize, connection) {
        return this.pageSelectBySql(`select * from ${this.tableName}`, condition, pageNum, pageSize, connection);
    }

    count(condition, connection) {
        return this.query(`select count(1) cnt from ${this.tableName} ${condition ? condition.toSql() : ''}`,
            condition && condition.toValue(), connection).then(res => res[0].cnt);
    }

    insert(obj, connection) {
        let values = [];
        let fields = [];
        let marks = [];

        // id
        let setID = null;
        if (!this.autoPK) {
            if (!obj[this.primaryKey]) {
                obj[this.primaryKey] = iDGenerator();
            }
        } else {
            // remove id if existed
            if (obj.hasOwnProperty(this.primaryKey))
                delete obj[this.primaryKey];
            setID = result => obj[this.primaryKey] = result.insertId;
        }

        // build sql
        for (let field in obj) {
            values.push(obj[field]);
            fields.push(field);
            marks.push('?');
        }


        let sql = `insert into ${this.tableName}(${fields.join(', ')}) values(${marks.join(', ')})`;
        return this.update(sql, values, setID, connection);
    }

    updateByPK(obj, connection) {
        if (!obj.hasOwnProperty(this.primaryKey)) {
            throw new Error('Object must contain primary key.');
        }
        let idValue, fields = [], values = [];
        for (let field in obj) {
            if (field === this.primaryKey) {
                idValue = obj[field];
            } else {
                fields.push(`${field} = ?`);
                values.push(obj[field]);
            }
        }
        values.push(idValue);
        let sql = `update ${this.tableName} set ${fields.join(', ')} where ${this.primaryKey} = ?`;
        return this.update(sql, values, null, connection);
    }

    deleteById(id, connection) {
        let sql = `delete from ${this.tableName} where ${this.primaryKey} = ?`;
        return this.update(sql, id, null, connection);
    }

    deleteBatch(ids, connection) {
        if (ids === null || ids.length === 0) return Promise.resolve();
        let sql = `delete from ${this.tableName} where ${this.primaryKey} in (${ids.join(',')})`;
        return this.update(sql, ids, null, connection);
    }



    insertOrUpdate(data, connection) {
        if (data.hasOwnProperty(this.primaryKey) && data[this.primaryKey]) {
            return this.count(Condition.create().eq(this.primaryKey, data[this.primaryKey])).then(cnt => {
                if (cnt > 0) {
                    // exist
                    return this.updateByPK(data, connection);
                } else {
                    return this.insert(data, connection);
                }
            });
        }
        return this.insert(data, connection);
    }

    _execute(callback, conn) {
        return new Promise((resolve, reject) =>
            conn ? callback(conn, resolve, reject) :
                this.getConnection().then(conn => callback(conn, resolve, reject)).catch(err => reject(err)));
    }

    query(sql, param, connection) {
        console.log(`execute sql: ${sql}, parameters: ${param}`);
        return this._execute((conn, resolve, reject) => {
            conn.query(sql, param, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    !connection && conn.release(); // close if connection is null
                    resolve(results);
                }
            });
        }, connection);
    }

    update(sql, param, callback, connection) {
        console.log(`execute sql: ${sql}, parameters: ${param}`);
        return this._execute((conn, resolve, reject) => {
            conn.query(sql, param, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    !connection && conn.release(); // close if connection is null
                    callback && callback(results);
                    resolve(results.affectedRows);
                }
            });
        }, connection);
    }
}


module.exports = BaseDao;