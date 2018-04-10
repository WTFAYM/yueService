class Page {
    constructor(pageNum = 1, pageSize = 10) {
        this.pageNum = parseInt(pageNum);
        this.pageSize = pageSize;
    }

    setData(data) {
        this.data = data;
    }

    setRecordCount(records) {
        this.recordCount = records;
        this.pageCount = parseInt((records + this.pageSize - 1) / this.pageSize);
    }
}

module.exports = Page;