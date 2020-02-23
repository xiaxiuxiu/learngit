<!--
 * @Author: your name
 * @Date: 2020-02-16 02:41:14
 * @LastEditTime: 2020-02-16 15:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \昆山公安局疫情防控数据录入系统\src\views\result\upload\index.vue
 -->
<template>
  <div class="wrap">
    <TopTitle :title="'成果图片上传'" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Form
          ref="formValidate1"
          label-position="right"
          :model="formValidate1"
          :label-width="150"
        >
          <div class="form">
            <FormItem label="文件日期:" prop="time" class="m-form-block">
              <DatePicker
                type="date"
                format="yyyy-MM-dd"
                v-model="formValidate1.time"
              />
            </FormItem>
            <FormItem label="文件名称:" prop="name" class="m-form-block">
              <Input v-model="formValidate1.name" placeholder />
            </FormItem>
            <FormItem label="文件类别:" prop="wjlb" class="m-form-block">
              <Select v-model="formValidate1.wjlb" :transfer="true">
                <Option value="1">高位统筹</Option>
                <Option value="2">文件精神</Option>
                <Option value="3">党旗飘扬</Option>
                <Option value="4">涉疫打击</Option>
                <Option value="5">先进典型</Option>
                <Option value="6">战时正能量</Option>
              </Select>
            </FormItem>
            <FormItem label="是否展示:" prop="isShow" class="m-form-block">
              <Select v-model="formValidate1.isShow" :transfer="true">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            </FormItem>
            <FormItem label="图片" prop="uploadFiles" class="m-form-block">
              <Upload
                multiple
                action=""
                accept="image/*, text/*"
                :before-upload="beforeUpload"
              >
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
              <div v-if="formValidate1.uploadFiles.length > 0">
                <h4>文件列表</h4>
                <div v-for="item in formValidate1.uploadFiles" :key="item.name">
                  <span>{{ item.name }}</span>
                  <span
                    style="cursor: pointer;"
                    @click="handleRemove(item.name)"
                  >
                    <Icon type="ios-close" size="20" />
                  </span>
                </div>
              </div>
            </FormItem>
          </div>
        </Form>
        <div style="display: flex;justify-content: center;">
          <Button type="primary" size="large" @click="upload">
            上传
          </Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TopTitle from "@/components/top-title/top-title";
import api from "@/api/result";
import page from "@/mixin/page";
export default {
  mixins: [page],
  components: {
    TopTitle
  },
  data() {
    return {
      closed: false,
      formValidate1: {
        time: new Date(), //文件日期
        name: "", //文件名称
        wjlb: "1", //文件类别
        isShow: "1", //是否展示
        uploadFiles: []
      }
    };
  },
  methods: {
    beforeUpload(file) {
      const filterArr = this.formValidate1.uploadFiles.filter(
        val => file.name === val.name
      );
      // 如果文件名存在的话就不添加
      if (filterArr.length === 0) {
        this.formValidate1.uploadFiles.push(file);
      }
      return false;
    },
    handleRemove(fileName) {
      let i = 0;
      let len = this.formValidate1.uploadFiles.length;
      for (; i < len; i++) {
        if (this.formValidate1.uploadFiles[i].name === fileName) {
          this.formValidate1.uploadFiles.splice(i, 1);
          break;
        }
      }
    },
    async upload() {
      if (this.formValidate1.uploadFiles.length > 0) {
        const result = await api.upload(this.formValidate1);
        if (result.code === 200) {
          this.$Message.success("上传成功！");
        } else {
          this.$Message.error("上传失败！");
        }
      } else {
        this.$Message.warning("上传文件为空！");
      }
    }
  }
};
</script>

<style scoped lang="less">
@import url("../../../styles/index2.less");
</style>
