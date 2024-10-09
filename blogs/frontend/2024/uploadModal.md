---
title: 封装一个小程序的upload图片上传组件
date: 2024-10-09
categories:
 - vue
tags:
 - 组件
---

## 说明

1. serverUrl：图片上传的服务器地址
2. imgList：已上传了的图片列表
3. chooseImg：选择要上传的图片，设置了`serverUrl`则自动上传，否则触发`change`方法触发`complete`事件
4. uploadImg：组件内的图片上传方法，使用自动上传才会调用此方法
5. upload：手动上传图片，通过在父组件中调用子组件upload方法，传入回调函数来上传图片
6. change：此方法会触发`complete`事件，可通过在父组件中监听`complete`事件，此事件返回一个图片列表的上传状态对象

## 实现

```vue
<template>
	<tui-modal :show="show" custom padding="30rpx 20rpx">
		<view class="content">
			<view>{{title}}</view>
			<view class="upload-wrap">
				<view class="square img-item" v-for="(img,idx) in imageList" :key="idx">
					<image class="img" :src="img"></image>
					<view class="mask" v-if="statusArr[idx]!=1">
						<view class="loading" v-if="statusArr[idx]==2"></view>
						<view class="tips">{{statusArr[idx]==2?'上传中...':'上传失败'}}</view>
						<view v-if="statusArr[idx]==3" class="reupload-btn" @click="reUpload(idx)">重新上传</view>
					</view>
				</view>
				<view class="square upload-add" @click="chooseImg" v-if="isShowAdd">
					<tui-icon name='plus' size="56"></tui-icon>
				</view>
			</view>
			<view class="btn-group">
				<tui-button width="220rpx" height="72rpx" :size="28" plain type="danger" shape="circle" @click="close">确定</tui-button>
				<tui-button v-if="showUploadBtn" width="220rpx" height="72rpx" :size="28" type="danger" shape="circle" @click="uploadBtn">上传</tui-button>
			</view>
		</view>
	</tui-modal>
</template>

<script>
	export default {
		props: {
			title: {
				default: '标题',
				type: String
			},
			value: { default: false },
			formData: {
				type: Object,
				default () {
					return {}
				}
			},
			serverUrl: {
				type: String,
				default: ''
			},
			cdnUrl: {
				type: String,
				default: ''
			},
			fileKeyName: {
				type: String,
				default: 'file'
			},
			limit: {
				type: Number,
				default: 3
			},
			size: {
				default: 4,
				type: Number
			},
			imgList: {
				type: Array,
				default () {
					return []
				}
			},
			showUploadBtn: {
				default: true,
				type: Boolean
			}
		},
		data () {
			return {
				imageList: [],
				//上传状态：1-上传成功 2-上传中 3-上传失败
				statusArr: [],
				tempFiles: [],
				callUpload: false,
				show: this.value
			}
		},
		watch: {
			value (val) {
				this.show = val
			},
			// imgList (val) {
			// 	if (val) {
			// 		this.initImage()
			// 	}
			// }
		},
		computed: {
			isShowAdd () {
				return this.limit > this.imageList.length
			}
		},
		created () {
			this.initImage()
		},
		methods: {
			initImage () {
				this.statusArr = []
				this.imageList = [...this.imgList]
				for (let item of this.imageList) {
					this.statusArr.push('1')
				}
				this.change()
			},
			chooseImg () {
				uni.chooseMedia({
					mediaType: 'image',
					count: this.limit - this.imageList.length,
					success: e => {
						const imgArr = []
						for (let i = 0;i < e.tempFiles.length;i++) {
							const path = e.tempFiles[i].tempFilePath
							// const ext = path.split('.').slice(-1)
							// 过滤图片是否超出大小限制
							const size = e.tempFiles[i].size
							if (this.size * 1024 * 1024 < size) {
								this.toast(`单张图片不能超过${this.size}MB`)
								continue
							}
							imgArr.push(path)
							this.imageList.push(path)
							// 设置选择的图片为“上传中”
							this.statusArr.push('2')
						}
						this.change()
						// 准备上传
						// 从第几张图片开始上传，因为有可能前面已有默认已上传的图片在
						let start = this.imageList.length - imgArr.length
						for (let k = 0;k < imgArr.length;k++) {
							let index = start + k
							// 是否有传入服务器地址，有的话自动上传
							if (this.serverUrl) {
								this.uploadImg(index,imgArr[k]).then(r=>{
									this.change(true)
								}).catch(()=>{
									this.change()
								})
							} else {
								// 无传入服务器地址，则返回成功
								this.$set(this.statusArr,index,'1')
								this.change()
							}
						}
					}
				})
			},
			change (complete) {
				// ~：位运算取反，这里作用可以寻找出数组中是否存在给出的值，因为indexOf不存在返回-1
				// 为了方便判断，使用~取反；-1取反等于0，表示不存在，存在值为非0
				let status = ~this.statusArr.indexOf('2') ? 2 : 1
				if (status != 2 && ~this.statusArr.indexOf('3')) {
					status = 3
				}
				complete = complete ? complete : false
				this.$emit('complete',{
					status,
					imgArr: this.imageList,
					complete
				})
			},
      /**
       * @description 通过在父组件中调用子组件upload方法传入回调函数来上传图片，由组件的upload方法处理上传后的成功与否
       * @param {promise} callback 传入一个返回promise对象的函数，这个函数是执行图片上传
       * @param {number} index 要上传的图片列表中的图片下标
       */
			async upload (callback,index) {
				this.callUpload = true
				if (index === undefined || index === null) {
					let imgsPath = [...this.imageList],len = imgsPath.length
					for (let i = 0;i < len;i++) {
						// 如果是https则表示已上传，否则表示未上传
						if (imgsPath[i].startsWith('https')) {
							continue
						} else {
							this.$set(this.statusArr,i,'2')
							if (typeof callback === 'function') {
								try {
									const res = await callback(imgsPath[i])
									this.$set(this.statusArr,i,'1')
									this.imageList[i] = res
								} catch (e) {
									this.$set(this.statusArr,i,'3')
								}
							}
						}
					}
				} else {
					// 有传入index，表示重新上传某张图片
					this.$set(this.statusArr,index,'2')
					if (typeof callback === 'function') {
						try {
							const res = await callback(this.imageList[index])
							this.$set(this.statusArr,index,'1')
							this.imageList[index] = res
						} catch (e) {
							this.$set(this.statusArr,index,'3')
						}
					}
				}
        // 等待所有图片上传完毕执行change
				this.change(true)
			},
			uploadBtn () {
				this.$emit('upload')
			},
      /**
       * 图片上传
       * @description 提供了serverUrl，则会使用组件的图片上传方法，不需要手写上传图片逻辑
       * @param idx 图片数组中的要上传的图片下标
       * @param filePath 要上传的图片路径
       * @param serverUrl 上传的服务器地址
       */
			uploadImg (idx,filePath,serverUrl) {
				return new Promise((resolve,reject)=>{
					uni.uploadFile({
						url: this.serverUrl || serverUrl,
						filePath: filePath,
						name: this.fileKeyName,
						formData: this.formData,
						success: res => {
							if (res.statusCode == 200) {
								const data = JSON.parse(res.data)
								data.url && (this.imageList[idx] = data.url)
								this.$set(this.statusArr,idx,'1')
								resolve(idx)
							} else {
								this.$set(this.statusArr,idx,'3')
								reject(idx)
							}
						},
						fail: err => {
							this.$set(this.statusArr,idx,'3')
							reject(idx)
						}
					})
				})
			},
			reUpload (index) {
				this.$set(this.statusArr,index,'2')
				this.$emit('reUpload',index)
				if (!this.callUpload) {
					this.uploadImg(index,this.imageList[index]).then(()=>{
						this.change(true)
					}).catch(()=>{
						this.change()
					})
				}
			},
			close () {
				this.$emit('input',false)
			},
			toast (txt) {
				txt && uni.showToast({
					icon: 'none',
					title: txt
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		.upload-wrap{
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			margin: 12rpx 0;
			.square{
				margin: 12rpx;
			}
		}
	}
	.img-item{
		position: relative;
		font-size: 0;
		overflow: hidden;
		border-radius: 10rpx;
		.img{
			width: 160rpx;
			height: 160rpx;
		}
		.mask{
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			width: 100%;
			height: 100%;
			font-size: 24rpx;
			background: rgba(0,0,0,.6);
			color: #fff;
		}
		.reupload-btn{
			padding: 8rpx 12rpx;
			border: 1px solid #fff;
			border-radius: 16rpx;
		}
		.loading {
			width: 28rpx;
			height: 28rpx;
			border-radius: 50%;
			border: 2px solid;
			border-color: #B2B2B2 #B2B2B2 #B2B2B2 #fff;
			animation: loading-rotate 0.7s linear infinite;
		}
	}
	.upload-add{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 160rpx;
		height: 160rpx;
		border-radius: 10rpx;
		border: 1px solid #999;
	}
	.btn-group{
		display: flex;
		width: 100%;
		justify-content: space-evenly;
	}

	@keyframes loading-rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
```

## 使用

使用手动上传

```vue
<template>
  <upload-modal
  ref="uploadRef"
  v-model="showExtraModal"
  title="图片上传"
  :imgList="imgList"
  :showUploadBtn="false"
  @complete="uploadResult"
  @reUpload="reUpload"
></upload-modal>
</template>
<script>
export default {
  data(){
    return {
      imgList: [],
      showExtraModal: false,
      serverUrl: 'https://up-z0.qiniup.com',
      niuConfig: {},
      extraFormData: {},
      extraData: [],
    }
  },
  async onLoad (options) {
    this.niuConfig = await this.$request({ name: 'get7NiuConfig' })
    this.extraFormData = {
      token: this.niuConfig.token,
      key: `${this.niuConfig.savekey}${new Date().getTime()}_${Math.random() * 100}`
    }
  },
  methods:{
    uploadResult (result) {
      this.imgList = result.imgArr
      if (this.$refs.uploadRef.upload && result.status === 1 && !result.complete) {
        this.$refs.uploadRef && this.$refs.uploadRef.upload(this.uploadImg)
      } else if (result.status === 1 && result.complete) {
        this.extraData = [...result.imgArr]
        this.detail.lottery_needextra = 0
      }
    },
    uploadImg (filePath) {
      return new Promise((resolve,reject)=>{
        uni.uploadFile({
          url: this.serverUrl,
          name: 'file',
          filePath,
          formData: {
            token: this.niuConfig.token,
            key: `${this.niuConfig.savekey}${new Date().getTime()}_${(Math.random() * 100).toFixed(2)}.${filePath.split('.').slice(-1)}`
          },
          success: res=>{
            if (res.statusCode == 200) {
              const data = JSON.parse(res.data)
              const fullPath = `${this.niuConfig.cdnurl}/${data.key}`
              resolve(fullPath)
            } else {
              reject()
            }
          },
          fail: err=>{
            reject()
          }
        })
      })
    },
    reUpload (index) {
      this.$refs.uploadRef && this.$refs.uploadRef.upload(this.uploadImg,index)
    }
  }
}
</script>
```

