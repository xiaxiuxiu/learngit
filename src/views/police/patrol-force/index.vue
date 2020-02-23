<template>
  <div class="wrap">
    <TopTitle :title="'巡防力量情况'" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button
          @click="
            () => {
              this.modal1 = true;
              this.add = true;
            }
          "
        >新增数据</Button>
        <div class="my-table">
          <Table :columns="columns1" :data="tabList1">
            <template slot-scope="{ row }" slot="isclose">
              <span v-if="row.isclose == 1">是</span>
              <span v-else>否</span>
            </template>
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
      title="巡防力量情况"
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
            <FormItem label="路口卡口名称:" prop="lkkkmc" class="m-form-block">
              <Input v-model="formValidate1.lkkkmc" placeholder />
            </FormItem>
            <FormItem label="路口卡口编号:" prop="lkkkbh" class="m-form-block">
              <Input v-model="formValidate1.lkkkbh" placeholder />
            </FormItem>
            <FormItem label="民警数:" prop="mjs" class="m-form-block">
              <Input v-model="formValidate1.mjs" placeholder />人
            </FormItem>
            <FormItem label="辅警数:" prop="fjs" class="m-form-block">
              <Input v-model="formValidate1.fjs" placeholder />人
            </FormItem>
            <FormItem label="枪支数:" prop="qzs" class="m-form-block">
              <Input v-model="formValidate1.qzs" placeholder />支
            </FormItem>
            <FormItem label="车辆数:" prop="cls" class="m-form-block">
              <Input v-model="formValidate1.cls" placeholder />辆
            </FormItem>
            <FormItem label="是否关闭:" prop="isclose" class="m-form-block">
              <Select v-model="formValidate1.isclose" :transfer="true">
                <Option value="0">否</Option>
                <Option value="1">是</Option>
              </Select>
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="cancel1()">取消</Button>
        <Button type="primary" @click="ok1()" v-if="add == true">确认</Button>
        <Button type="primary" @click="ok2()" v-else>确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import TopTitle from "@/components/top-title/top-title";
import api from "@/api/police/index";
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
      modal2: false,
      add: false,
      closed: false,
      formValidate1: {
        lkkkmc: "", //路口卡口名称
        lkkkbh: "", //路口卡口编号
        isclose: "", //是否关闭
        mjs: "", //民警数
        fjs: "", //辅警数
        qzs: "", //枪支数
        cls: "" //车辆数
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
          width: 180,
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
          title: "路口卡口名称",
          width: 220,
          key: "lkkkmc",
          render: (h, params) => {
            return h("div", params.row.lkkkmc + "路口");
          }
        },
        {
          title: "路口卡口编号",
          width: 150,
          key: "lkkkbh"
        },
        {
          title: "是否关闭",
          width: 150,
          key: "isclose",
          slot: "isclose"
        },
        {
          title: "民警数",
          width: 150,
          key: "mjs",
          render: (h, params) => {
            return h("div", params.row.mjs + "人");
          }
        },
        {
          title: "辅警数",
          width: 150,
          key: "fjs",
          render: (h, params) => {
            return h("div", params.row.fjs + "人");
          }
        },
        {
          title: "枪支数",
          width: 150,
          key: "qzs",
          render: (h, params) => {
            return h("div", params.row.qzs + "支");
          }
        },
        {
          title: "车辆数",
          width: 150,
          key: "cls",
          render: (h, params) => {
            return h("div", params.row.cls + "辆");
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
        //   lkkkmc: "22", //路口卡口名称
        //   lkkkbh: "11", //路口卡口编号
        //   isclose: "1", //是否关闭
        //   mjs: "11", //民警数
        //   fjs: "11", //辅警数
        //   qzs: "11", //枪支数
        //   cls: "11" //车辆数
        // }
      ]
    };
  },
  mounted() {
    this.searchFunc(this.pageSet);
  },
  methods: {
    searchFunc(data) {
      api.xfll(data).then(res => {
        this.total = res.data.total;
        this.tabList1 = res.data.tabList;
      });
    },
    handleEdit(row) {
      this.modal1 = true;
      this.add = false;
      this.formValidate1 = row;
    },
    handleDelete(row) {
      //删除
      api.delete({ type: "5", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.searchFunc(this.pageSet);
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer, { id: "" });
      api.xfllgx(obj).then(res => {
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
      api.xfllgx(obj).then(res => {
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
    }
  }
};
</script>

<style scoped lang="less">
@import url("../../../styles/index2.less");
.wrap {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 15px 0 rgba(14, 37, 38, 0.06);
  &-form {
    padding: 20px;
  }
  button {
    height: 40px;
    color: #53a7a9;
    border-color: #53a7a9;
    background: rgba(83, 167, 169, 0.1);
  }
}
</style>
