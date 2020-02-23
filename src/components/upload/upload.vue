<!--
 * @Author: wangzhongjie
 * @Date: 2019-10-24 11:25:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-06 11:11:42
 * @Description: 文件上传
 * @Email: UvDream@163.com
 -->
<template>
  <div>
    <div
      class="demo-upload-list"
      v-for="(item, index) in uploadList"
      :key="index"
    >
      <template v-if="item.status === 'finished'">
        <img :src="item.filepath" />
        <div class="demo-upload-list-cover">
          <Icon
            type="ios-eye-outline"
            @click.native="handleView(item.filepath)"
          ></Icon>
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          ></Icon>
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        ></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="true"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :data="uploadData"
      :multiple="true"
      type="drag"
      :action="url"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="预览" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<script>
import { baseUrl } from "@/config/env";
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      // 上传接口地址
      url: baseUrl + "/jsbrgl/fileUploadController/fileUpload1",
      imgName: "avatar.png",
      visible: false,
      uploadList: [],
      indexId: ""
    };
  },
  computed: {
    uploadData: function() {
      console.log(this.indexId, "this.indexId");
      return {
        archivesId: this.indexId
      };
    }
  },
  watch: {
    /*value() {
            this.uploadList = this.value.map(item => {
                return {
                    filepath: item.filepath,
                    name: item.filecode,
                    status: 'finished',
                    showProgress: false
                };
            });
        }*/
    value: {
      handler(newval, oldval) {
        this.uploadList = newval.map(item => {
          return {
            filepath: item.filepath,
            name: item.filecode,
            status: "finished",
            showProgress: false
          };
        });
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleView(name) {
      // console.log(name);
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      debugger;
      //const fileList = this.$refs.upload.fileList,
      //index = fileList.indexOf(file);
      //this.$refs.upload.fileList.splice(index, 1);
      let index = this.uploadList.findIndex(
        item => item.filepath == file.filepath
      );
      this.uploadList.splice(index, 1);
      this.$emit(
        "input",
        this.uploadList.map(item => {
          return { filepath: item.filepath };
        })
      );
    },
    handleSuccess(res, file, fileList) {
      this.uploadList.push({
        filepath: res.data.filePath,
        name: res.data.fileName,
        status: "finished",
        showProgress: false
      });

      this.$emit(
        "input",
        this.uploadList.map(item => {
          return { filepath: item.filepath };
        })
      );
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件格式 " + file.name + " 不正确，请选择jpg 或 png 。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件  " + file.name + " 太大，不超过2M."
      });
    },
    handleBeforeUpload(file) {
      console.log(file);
      this.uploadList = file;
      return false;
      /*this.uploadData = {
                archivesId: this.indexId
            }
            debugger
            let promise = new Promise((resolve) => {
                this.$nextTick(function () {
                    resolve(true);
                });
            });
            return promise; //通过返回一个promis对象解决*/
    }
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.ivu-upload-list {
  display: none;
}
</style>
