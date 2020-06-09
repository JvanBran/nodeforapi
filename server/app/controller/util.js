module.exports ={
    paging:(options)=>{
        const result = []
        const pageNo = parseInt(options.reqBody.pageNo)
        const pageSize = parseInt(options.reqBody.pageSize)
        const totalPage = Math.ceil(options.totalCount / pageSize)
        const key = (pageNo - 1) * pageSize
        const next = (pageNo >= totalPage ? (options.totalCount % pageSize) : pageSize)
        for (let i = 0; i < next; i++) {
            const tmpKey = key + i;
            result.push(options.list[tmpKey]?options.list[tmpKey]:{})
        }
        return {
            pageSize: pageSize,
            pageNo: pageNo,
            totalCount: options.totalCount,
            totalPage: totalPage,
            data: result
        }
    }
}