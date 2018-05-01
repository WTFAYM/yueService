
class BaseService {

    constructor(daoName) {
        this.dao = this.ref(daoName);
    }

    /**
     * reference dao
     */
    ref(name) {
        if (!beanContainer.daos[name.toLowerCase()]) {
            throw new Error(`Can't found ${name}`);
        }
        return beanContainer.daos[name.toLowerCase()];
    }


    /**
     * 启动事务
     * execution必须返回Promise
     * @param execution 带有conn参数
     */
    async surroundTransaction(execution) {
        let conn = null;
        try {
            console.log('Begin transaction: ');
            conn = await this.dao.beginTransaction();
            await execution(conn);
            await this.dao.commit(conn);
            console.log('Commit transaction.');
            return true;
        }catch(err) {
            if (conn) {
                console.error(err);
                this.dao.rollback(conn);
                console.log('Rollback transaction.');
                return false;
            }
        }
    }

    /**
     * 插入对象，如果没有id，则根据配置的生成策略自动生成，data将具有插入后的id
     * @param data
     * @returns {Promise.<*>}
     */
    async insert(data) {
        return await this.dao.insert(data);
    }

    /**
     * 根据Id删除记录
     * @param id
     * @returns {Promise.<*>}
     */
    async deleteById(id) {
        return await this.dao.deleteById(id);
    }

    /**
     * 根据Id批量删除记录
     * @param id
     * @returns {Promise.<*>}
     */
    async deleteBatch(ids) {
        return await this.dao.deleteBatch(ids);
    }

    /**
     * update by pk
     * @param data
     * @returns {Promise.<*>}
     */
    async update(data) {
        return await this.dao.updateByPK(data);
    }

    /**
     * 根据条件分页搜索所有记录
     * @param pageNum
     * @returns {Promise.<*>}
     */
    async pageSelectAll(pageNum = 1) {
        return await this.dao.pageSelectAll();
    }

    /**
     * 根据条件分页搜索
     * @param condition
     * @param pageNum
     * @returns {Promise.<*>}
     */
    async pageSelectList(condition, pageNum = 1) {
        return await this.dao.pageSelectList(condition, pageNum);
    }

    /**
     * 根据主键查找记录
     * @param id
     * @returns {Promise.<*>}
     */
    async selectOne(id) {
        return await this.dao.selectOne(id);
    }

    /**
     * 根据条件搜索多条记录
     * @param condition Condition对象
     * @returns {Promise.<*>}
     */
    async selectList(condition) {
        return await this.dao.selectList(condition);
    }

    /**
     * 搜索所有记录
     * @param condition Condition对象
     * @returns {Promise.<*>}
     */
    async selectAll() {
        return await this.dao.selectAll();
    }

    async insertOrUpdate(data) {
        return await this.dao.insertOrUpdate(data);
    }

}


module.exports = BaseService;