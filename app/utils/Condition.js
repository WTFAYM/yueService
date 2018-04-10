class OneParam {
    constructor(field, operator, value) {
        [this.field, this.value, this.operator] = [field, value, operator];
    }

    toSql() {
        return `${this.field} ${this.operator} ?`;
    }

    toValue() {
        return [this.value];
    }
}

class Is {
    constructor(field, operator, value) {
        [this.field, this.value, this.operator] = [field, value, operator];
    }
    toSql() {
        return `${this.field} ${this.operator} ${this.value}`;
    }

    toValue() {
        return [];
    }
}

class Between {
    constructor(field, min, max) {
        [this.field, this.min, this.max] = [field, min, max];
    }

    toSql() {
        return `${this.field} between ? and ?`;
    }

    toValue() {
        return [this.min, this.max];
    }
}
class In {
    constructor(field, values) {
        [this.field, this.values] = [field, values];
    }

    toSql() {
        return `${this.field} in (${this.values.map(() => '?').join(', ')})`;
    }

    toValue() {
        return this.values;
    }
}

METHODS = ['like', 'eq', 'gt', 'lt' , 'ge', 'le', 'rLike', 'lLike'];

class Condition {
    constructor() {
        this._conditionObjs = [];
        this._orderByObj = [];
        this._limit = null;
    }

    static create() {
        return new Condition();
    }

    isNull(field) {
        this._conditionObjs.push(new Is(field, 'is', 'null'));
        return this;
    }

    isNotNull(field) {
        this._conditionObjs.push(new Is(field, 'is not', 'null'));
        return this;
    }

    in(field, values) {
        this._conditionObjs.push(new In(field, values));
        return this;
    }

    eq(field, value) {
        this._conditionObjs.push(new OneParam(field, '=', value));
        return this;
    }

    like(field, value) {
        this._conditionObjs.push(new OneParam(field, 'like', `%${value}%`));
        return this;
    }

    lLike(field, value) {
        this._conditionObjs.push(new OneParam(field, 'like', `%${value}`));
        return this;
    }

    rLike(field, value) {
        this._conditionObjs.push(new OneParam(field, 'like', `${value}%`));
        return this;
    }


    gt(field, value) {
        this._conditionObjs.push(new OneParam(field, '>', value));
        return this;
    }

    lt(field, value) {
        this._conditionObjs.push(new OneParam(field, '<', value));
        return this;
    }

    ge(field, value) {
        this._conditionObjs.push(new OneParam(field, '>=', value));
        return this;
    }

    le(field, value) {
        this._conditionObjs.push(new OneParam(field, '<=', value));
        return this;
    }

    between(field, min, max) {
        this._conditionObjs.push(new Between(field, min, max));
        return this;
    }

    or(condition) {
        if (!(condition instanceof Condition))
            throw new Error('Argument must be an instance of Condition.');
        this._conditionObjs.push({join: 'or', condition});
        return this;
    }

    and(condition) {
        if (!(condition instanceof Condition))
            throw new Error('Argument must be an instance of Condition.');
        this._conditionObjs.push({join: 'and', condition});
        return this;
    }

    limit(start, num) {
        this._limit = {start, num};
        return this;
    }

    orderBy(field, desc = false) {
        this._orderByObj.push({field, desc});
        return this;
    }

    toSql(where = true) {
        let conditionStatement = '';
        this._conditionObjs.forEach(cond => {
            let join = cond.hasOwnProperty('join') ? cond.join : 'and';
            let statement = cond.hasOwnProperty('join') ? `(${cond.condition.toSql(false)})` : cond.toSql();
            if (conditionStatement === '') {
                if (join === 'or')
                    throw new Error("Can't use 'or' as the first condition.");
                conditionStatement = statement;
            } else {
                conditionStatement += ` ${join} ${statement}`;
            }
        });

        conditionStatement = (where && this._conditionObjs.length > 0 ? 'where ' : '') + conditionStatement;

        let orderStatement = (this._orderByObj.length > 0 ? ' order by ' : '') +
            this._orderByObj.map(order => `${order.field} ${order.desc ? 'desc' : 'asc'}`).join(', ');

        let limitStatement = this._limit ? ` limit ${this._limit.start}, ${this._limit.num}` : '';
        return `${conditionStatement}${orderStatement}${limitStatement}`;
    }

    toValue() {
        if (this._conditionObjs.length === 0) {
            return null;
        }
        return this._conditionObjs.map(cond => cond.hasOwnProperty('join') ? cond.condition.toValue() : cond.toValue()).reduce((a, b) => [...a, ...b]);
    }


    /**
     * 通过查询的参数构造Condition
     * @param params
     * @returns {*}
     */
    static fromParams(params) {
        let condition = Condition.create();
        for (let key in params) {
            if (params.hasOwnProperty(key) && key.indexOf("_") > 0){
                let i = key.lastIndexOf("_");
                let name = key.substr(0, i);
                let method = key.substr(i + 1);
                if (METHODS.indexOf(method) >= 0)
                    condition[method](name, params[key]);
            }
        }
        return condition;
    }
}

module.exports = Condition;