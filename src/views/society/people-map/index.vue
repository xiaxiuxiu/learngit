<template>
  <div class="wrap">
    <TopTitle :title="'人员分布地图和昆山排名'" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button @click="modal()">新增数据</Button>
        <div class="my-table">
          <Table :columns="columns1" :data="tabList1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                class="my-table-handle-button"
                @click="handleEdit(row, index)"
                style="width:100px;"
              >修改</Button>
              <Button class="my-table-handle-button" @click="handleDelete(row, index)">删除</Button>
            </template>
          </Table>
          <Page
            :total="total"
            :page-size="pageSize"
            :current="pageNum"
            show-total
            class="my-table-page"
            @on-page-size-change="pageSizeChange"
            @on-change="pageChange"
          />
        </div>
      </div>
    </transition>
    <Modal
      title="人员分布地图和昆山排名"
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      scrollable
      width="800"
    >
      <div>
        <Form
          ref="formValidate1"
          label-position="left"
          :model="formValidate1"
          :label-width="150"
          inline
        >
          <div class="form">
            <FormItem label="区镇名称:" prop="qzmc" class="m-form-block">
              <Select
                v-model="formValidate1.qzmc"
                :transfer="true"
                :disabled="add"
                @on-open-change="openChange"
              >
                <Option
                  v-for="item in optionList"
                  :key="item.qzmc"
                  :value="item.qzmc"
                >{{ item.qzmc }}</Option>
              </Select>
            </FormItem>
            <FormItem label="确诊人数:" prop="qzrs" class="m-form-block">
              <Input v-model="formValidate1.qzrs" placeholder />人
            </FormItem>
            <FormItem label="疑似人数:" prop="ysrs" class="m-form-block">
              <Input v-model="formValidate1.ysrs" placeholder />人
            </FormItem>
            <FormItem label="隔离人数:" prop="glrs" class="m-form-block">
              <Input v-model="formValidate1.glrs" placeholder />人
            </FormItem>
            <FormItem label="治愈人数:" prop="zyrs" class="m-form-block">
              <Input v-model="formValidate1.zyrs" placeholder />人
            </FormItem>
            <FormItem label="死亡人数:" prop="swrs" class="m-form-block">
              <Input v-model="formValidate1.swrs" placeholder />人
            </FormItem>
            <FormItem label="武汉来昆人数:" prop="whlkrs" class="m-form-block">
              <Input v-model="formValidate1.whlkrs" placeholder />人
            </FormItem>
            <FormItem label="社区登记人数:" prop="sqdjrs" class="m-form-block">
              <Input v-model="formValidate1.sqdjrs" placeholder />人
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="cancel1()">取消</Button>
        <Button type="primary" @click="ok1()" :disabled="add" v-if="add2">确认</Button>
        <Button type="primary" @click="ok2()" v-else>确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import TopTitle from "@/components/top-title/top-title";
import api from "@/api/society/index";
import page from "@/mixin/page";
import { formatDate } from "@/util/util";
export default {
  mixins: [page],
  components: {
    TopTitle
  },
  data() {
    return {
      modal1: false,
      add: true, //控制禁用状态
      add2: true, //控制显示
      closed: true,
      formValidate1: {
        qzmc: "", //区镇名称
        qzrs: "", //确诊人数
        ysrs: "", //疑似人数
        glrs: "", //隔离人数
        zyrs: "", //治愈人数
        swrs: "", //死亡人数
        whlkrs: "", //武汉来昆人数
        sqdjrs: "" //社区登记人数
      },
      columns1: [
        {
          type: "index",
          title: "序号",
          width: 80,
          align: "center"
        },
        {
          title: "最新修改时间",
          width: 250,
          slot: "edittime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.edittime), "yyyy-MM-dd hh:mm")
            );
          }
        },
        {
          title: "修改人",
          width: 150,
          key: "editer"
        },
        {
          title: "区镇名称",
          width: 150,
          key: "qzmc"
        },
        {
          title: "确诊人数",
          width: 150,
          key: "qzrs",
          render: (h, params) => {
            return h("div", params.row.qzrs + "人");
          }
        },
        {
          title: "疑似人数",
          width: 150,
          key: "ysrs",
          render: (h, params) => {
            return h("div", params.row.ysrs + "人");
          }
        },
        {
          title: "隔离人数",
          width: 150,
          key: "glrs",
          render: (h, params) => {
            return h("div", params.row.glrs + "人");
          }
        },
        {
          title: "治愈人数",
          width: 150,
          key: "zyrs",
          render: (h, params) => {
            return h("div", params.row.zyrs + "人");
          }
        },
        {
          title: "死亡人数",
          width: 150,
          key: "swrs",
          render: (h, params) => {
            return h("div", params.row.swrs + "人");
          }
        },
        {
          title: "武汉来昆人数",
          width: 150,
          key: "whlkrs",
          render: (h, params) => {
            return h("div", params.row.whlkrs + "人");
          }
        },
        {
          title: "社区登记人数",
          width: 150,
          key: "sqdjrs",
          render: (h, params) => {
            return h("div", params.row.sqdjrs + "人");
          }
        },
        {
          title: "操作",
          width: 260,
          fixed: "right",
          slot: "action",
          key: "action",
          align: "center"
        }
      ],
      tabList1: [
        // {
        //   edittime: "2019-11-07 19:09:20", //;最新修改时间
        //   editer: "小红", //修改人
        //   qzmc: "22", //区镇名称
        //   qzrs: "11", //确诊人数
        //   ysrs: "11", //疑似人数
        //   glrs: "11", //隔离人数
        //   zyrs: "11", //治愈人数
        //   swrs: "11", //死亡人数
        //   whlkrs: "11", //武汉来昆人数
        //   sqdjrs: "11" //社区登记人数
        // }
      ],
      optionList: [
        // { val: "bc", name: "巴城镇" },
        // { val: "gx", name: "高新区" },
        // { val: "zs", name: "周市镇" },
        // { val: "kf", name: "开发区" },
        // { val: "lj", name: "陆家镇" },
        // { val: "zp", name: "张浦镇" },
        // { val: "qd", name: "千灯镇" },
        // { val: "hq", name: "花桥镇" },
        // { val: "jx", name: "锦溪镇" },
        // { val: "zz", name: "周庄镇" },
        // { val: "dsh", name: "淀山湖镇" },
        // { val: "bl", name: "柏庐办事处" },
        // { val: "tl", name: "亭林办事处" },
        // { val: "zc", name: "震川办事处" },
        // { val: "qy", name: "青阳办事处" }
      ]
    };
  },
  mounted() {
    this.searchFunc(this.pageSet);
    //获取是否在列表里
  },
  methods: {
    searchFunc(data) {
      api.ksmap(data).then(res => {
        this.total = res.data.total;
        this.tabList1 = res.data.tabList;
      });
    },
    handleEdit(row) {
      this.modal1 = true;
      this.add2 = false; //确认2显示
      this.add = true;
      this.formValidate1 = row;
    },
    handleDelete(row) {
      //删除
      api.delete({ type: "3", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.searchFunc(this.pageSet);
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer, { id: "" });
      api.ksmapgx(obj).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.modal1 = false;
          this.searchFunc(this.pageSet);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    ok2() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer);
      api.ksmapgx(obj).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.modal1 = false;
          this.searchFunc(this.pageSet);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    cancel1() {
      this.modal1 = false;
    },
    modal() {
      //新增
      this.modal1 = true;
      this.add2 = true;
      this.optionList = [];
      api.ksselect().then(res => {
        if (res.code == "10000") {
          this.optionList = res.data;
          if (res.data.length == 0) {
            this.add = true;
          } else {
            this.add = false;
          }
        }
      });
    },
    openChange() {}
  }
};
</script>

<style scoped lang="less">
@import url("../../../styles/index2.less");
</style>
