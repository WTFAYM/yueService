class JsonUtils {
    /**
     * 过滤掉bean中props的属性
     * @param json
     * @param props
     */
    static propertyFilter(json, props) {
        if (json instanceof Array) {
            return json.map(item => JsonUtils._propertyFilter(item, props));
        }else{
            return JsonUtils._propertyFilter(json, props);
        }
    }

    /**
     * 保留bean中props的属性
     * @param json
     * @param props
     */
    static propertyRemain(json, props) {
        if (json instanceof Array) {
            return json.map(item => JsonUtils._propertyFilter(item, props, true));
        }else{
            return JsonUtils._propertyFilter(json, props, true);
        }
    }

    static newJson(json) {
        let newJson = {};
        for (let key in json) {
            if (json.hasOwnProperty(key))
                newJson[key] = json[key];
        }
        return newJson;
    }


    static _propertyFilter(json, props, remainOrFilter = false) {
        if (!(props instanceof Array)) props = [props];
        props = new Set(props);
        let newJson = {};
        for (let key in json) {
            if (json.hasOwnProperty(key) && props.has(key) === remainOrFilter) {
                newJson[key] = json[key];
            }
        }
        return newJson;
    }
}

module.exports = JsonUtils;
