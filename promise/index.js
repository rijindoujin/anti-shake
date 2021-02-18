class myPromise{
    constructor(executor){
        //设置默认等待状态
        this.status = "pending";
        //成功后的值
        this.value = undefined;
        //失败的原因
        this.reason = undefined;
        //存放成功的回调
        this.onResolvedCallbacks = [];
        //存放失败的回调
        this.onRejectedCallbacks = [];

        let resolve = (data) => {   //this指的是实例
           //当resolve调用时相当于成功  所以改变状态为成功    
            if(this.status === 'pending'){
                this.value = data;
                this.status = 'resolved';
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        let reject = (reason) => {
            //reject同理 当reject调用时返回失败时，状态改成失败状态，
            if(this.status = 'pending'){
                this.reason = reason;
                this.status = 'rejected';
                this.onRejectedCallbacks.forEach(fn => fn()) 
            }
        }

        try{ //执行时可能会发生异常
            executor(resolve,reject) 
        }catch(error){
            reject(error) //promise失败了
        }
        
    }
    
    //then方法是promise的最基本的方法，返回的是两个回调，一个成功的回调，一个失败的回调，实现过程如下：
    then(onFulfilled,onRejected){
        //成功状态的回调
        if(this.status === 'resolved'){
            onFulfilled(this.value)
        }
        //失败状态的回调
        if(this.status === 'rejected'){
            onRejected(this.reason)
        }
        if(this.status === 'pending'){
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}

const promise = new myPromise((resolve,reject)=>{
    setTimeout(() => {
        resolve('成功');
      },1000);
}).then(
    (data) => {
        console.log('success',data)
    },
    (err) => {
        console.log('faild',err)
    }
)

// console.log(promise.name)
