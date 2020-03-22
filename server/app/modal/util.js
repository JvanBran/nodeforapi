
class AuxiliaryClass{
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.mongooseModel.find(dataArr, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    create(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.mongooseModel(self.ObjKeys(dataArr));
            user.save(function(e, data, numberAffected) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    update(option={}, dataArr={}){
        const self = this;
        return new Promise(function (resolve, reject){
            self.mongooseModel.updateOne(option, dataArr,function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    delete(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.mongooseModel.remove({
                _id: dataArr.id
            }, function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    /**
    * @module util
    * @author: Jvan
    * @description: 18146628322@189.cn
    * @since: 创建时间  2020-03-09 12:01:19
    * 返回有值且符合现有参数范围的对象 对象
    */
    
    ObjKeys(reqBody){
        let self = this;
        let dataArr = {}
        Object.keys(self.dataType).map(k=>{
            if(reqBody[k]){
                dataArr[k]=reqBody[k]
            }
            
        })
        return dataArr
    }

    ObjKeysNull(reqBody){
        let self = this;
        let dataArr = {}
        Object.keys(self.dataType).map(k=>{
            dataArr[k]=reqBody[k]?reqBody[k]:""
        })
        return dataArr
    }
    /**
    * @module util
    * @author: Jvan
    * @description: 18146628322@189.cn
    * @since: 创建时间  2020-03-09 12:01:19
    * 返回有值且符合现有参数范围的对象 数组
    */
   ArrKeys(Arr){
        let self = this;
        let dataArr = []
        Arr.map(k=>{
            dataArr.push(self.ObjKeysNull(k))
        })
        return dataArr
    }
}

export { AuxiliaryClass }
