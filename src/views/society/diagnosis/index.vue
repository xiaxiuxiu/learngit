<template>
  <div class="wrap">
    <TopTitle :title="'苏州区县确诊排名'" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button @click="modal()">新增数据</Button>
        <div class="my-table">
          <Table :columns="columns1" :data="tabList1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                class="my-table-handle-button"
                @click="handleEdit(row)"
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
      title="苏州区县确诊排名"
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      scrollable
      width="800"
    >
      <div>
        <Form ref="formValidate1" label-position="left" :model="formValidate1" :label-width="150">
          <div class="form">
            <FormItem label="区县名称:" prop="qzmc" class="m-form-block w-100">
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
            <FormItem label="确诊人数:" prop="qzrs" class="m-form-block w-100">
              <Input v-model="formValidate1.qzrs" placeholder />人
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
        qzrs: "" //确诊人数
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
          key: "editer"
        },
        {
          title: "区镇名称",
          key: "qzmc"
        },
        {
          title: "确诊人数",
          key: "qzrs",
          render: (h, params) => {
            return h("div", params.row.qzrs + "人");
          }
        },
        {
          title: "操作",
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
        //   qzmc: "2", //区镇名称
        //   qzrs: "11" //确诊人数
        // }
      ],
      optionList: [
        // { val: "常熟市", name: "常熟市" },
        // { val: "太仓市", name: "太仓市" },
        // { val: "昆山市", name: "昆山市" },
        // { val: "吴江区", name: "吴江区" },
        // { val: "吴中区", name: "吴中区" },
        // { val: "相城区", name: "相城区" },
        // { val: "姑苏区", name: "姑苏区" },
        // { val: "工业园区", name: "工业园区" },
        // { val: "高新区", name: "高新区" },
        // { val: "张家港", name: "张家港" },
        // { val: "虎丘区", name: "虎丘区" }
      ]
    };
  },
  mounted() {
    this.searchFunc(this.pageSet);
  },
  methods: {
    searchFunc(data) {
      api.szmap(data).then(res => {
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
      api.delete({ type: "4", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.searchFunc(this.pageSet);
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer, { id: "" });
      api.szmapgx(obj).then(res => {
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
      api.szmapgx(obj).then(res => {
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
      this.modal1 = true;
      this.add2 = true;
      this.optionList = [];
      api.szselect().then(res => {
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
    openChange(val) {}
  }
};
</script>

<style scoped lang="less">
@import url("../../../styles/index2.less");
</style>
