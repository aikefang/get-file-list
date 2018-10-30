let fs = require('fs')
let path = require('path')
class GetFileList {
  async config (obj) {
    this.type = obj.type || '.js'
    this.path = obj.path
  }
  async mapList ({dir, cb, list}) {
    list.map(async (data, index, all) => {
      let filePath = path.resolve(dir, data)
      let stat = fs.lstatSync(filePath)
      // 是文件夹 过滤文件夹
      if (stat.isDirectory()) {
        await this.getList({dir: filePath, cb})
      } else {
        //过滤非 .js 文件
        let rgx = `(${this.type})$`
        let re = new RegExp(rgx)
        if (re.test(filePath)) {
          cb(filePath)
        }
      }
    })
  }
  async getList ({dir, cb}) {
    let list = await fs.readdirSync(dir)
    await this.mapList({dir, cb, list})
  }
}
let getFileList = new GetFileList()

class GetList {
  async config(obj) {
    getFileList.config(obj)
  }
  async run () {
    let filesList = []
    await getFileList.getList({
      dir: path.resolve(getFileList.path),
      cb(filePath) {
        filesList.push(filePath)
      }
    })
    return filesList
  }
}

module.exports = new GetList()