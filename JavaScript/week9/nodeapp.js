var args=process.argv.slice(2)
if (args){
    var stream=args[1]
}
console.log(stream)

var NODE_ENV = "source"
var fs= require('fs')

var src_dir='./'+NODE_ENV+'/src'
var dest_dir='./'+NODE_ENV+'/dest'
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
eventEmitter.on('createFolders', () => {
    if(!fs.existsSync(src_dir)){
        console.log("newly created")
        fs.mkdirSync(src_dir,{ recursive: true }, (err) => {if (err) console.log(err);})
    }
    if(!fs.existsSync(dest_dir)){
        fs.mkdirSync(dest_dir,{ recursive: true }, (err) => {if (err) console.log(err);})
    }
    console.log('folders')
})
var txt_src=''
var filname=''
eventEmitter.on('createSourceFile', ()=>{
    filname=require('moment')().format('YYYY_MM_DD_HH_MM_SS');
    txt_src=src_dir+'/'+filname+'.txt'
    fs.writeFile(txt_src,'text formed successfull congrats',()=>{
        eventEmitter.emit('createDestFile')
    })
})
eventEmitter.on('createDestFile', ()=>{
    text_dest=dest_dir+'/'+filname+'.txt'
    var txt_dest_sync=dest_dir+'/'+filname+"sync"+'.txt'
    var text_dest_steams=dest_dir+'/'+filname+'-stream-copy'+'.txt'
    if (stream=='true'){
        //using streams
        const read_stream=fs.createReadStream(txt_src)
        const write_stream=fs.createWriteStream(text_dest_steams)
        read_stream.on('data',(chunk)=>{
            write_stream.write(chunk)
        })
        read_stream.on('error',(err)=>{
            console.log(err)
        })
        read_stream.on('end',()=>{
            console.log("completed streaming")
        })
        write_stream.on('finish',()=>{
            console.log("finished writing")
        })
    }
    else{
        // using files system
        fs.copyFile(txt_src,text_dest,function(data,err){
            if (err){
                console.log("error")
            }
            else{
                console.log("asynchronous successful")
            }
        })
        fs.copyFileSync(txt_src,txt_dest_sync)
    }    
})
eventEmitter.emit('createFolders')
eventEmitter.emit('createSourceFile')


