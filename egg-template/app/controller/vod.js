'use strict';
const Controller = require('egg').Controller
const RPCClient = require('@alicloud/pop-core').RPCClient

class VodController extends Controller {
  async getvodinfo(vodId) {
    const client = await this.vodClient()
    const res = await client.request('GetPlayInfo', {
      VideoId: vodId,
    }, {})
    return res
  }

  async getvideo() {
    const videoid = this.ctx.params.videoid
    const dbback = await this.app.model.Video.findById(videoid)
    if (dbback) {
      const videoInfo = dbback._doc
      const vodid = videoInfo.vodvideoId
      const vodInfo = await this.getvodinfo(vodid)
      videoInfo.vod = vodInfo
      this.ctx.body = videoInfo
    } else {
      this.throw(404, '视频不存在')
    }
  }

  async vodClient() {
    const regionId = 'cn-shanghai'; // 点播服务接入地域
    const client = new RPCClient({// 填入AccessKey信息
      accessKeyId: 'LTAI5t6N7W3BoSYpmtasXzoo',
      accessKeySecret: 'GSedSGNfNDvUOGP1Txz5AnwAxfSsa3',
      endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
      apiVersion: '2017-03-21',
    });

    return client;
  }

  async getvod() {
    const query = this.ctx.query
    this.ctx.validate({
      title: { type: 'string' },
      filename: { type: 'string' },
    }, query)
    const client = await this.vodClient()
    const vodback = await client.request('CreateUploadVideo', {
      Title: query.title,
      FileName: query.filename,
    }, {})
    this.ctx.body = vodback
  }

}

module.exports = VodController
