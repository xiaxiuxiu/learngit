<template>
  <div class="wrap">
    <TopTitle :title="'查控车辆和人员'" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button @click="handleEdit()" type="info">修改数据</Button>
        <div class="my-table">
          <Table :columns="columns1" :data="tabList1">
            <template slot-scope="{ row }" slot="action">
              <Button
                class="my-table-handle-button"
                @click="handleRecord(row)"
                style="width:100px;"
              >修改记录</Button>
              <Button class="my-table-handle-button" @click="handleDelete(row)">删除</Button>
            </template>
          </Table>
        </div>
      </div>
    </transition>
    <Modal
      title="查控车辆和人员"
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      scrollable
      width="800"
      inline
    >
      <div>
        <Form
          inline
          ref="formValidate1"
          label-position="left"
          :model="formValidate1"
          :label-width="150"
        >
          <div class="form">
            <FormItem label="查控车辆数:" prop="ckcls" class="m-form-block">
              <Input v-model="formValidate1.ckcls" placeholder />辆
            </FormItem>
            <FormItem label="鄂牌车辆数:" prop="epcls" class="m-form-block">
              <Input v-model="formValidate1.epcls" placeholder />辆
            </FormItem>
            <FormItem label="温州牌车辆:" prop="wzpcl" class="m-form-block">
              <Input v-model="formValidate1.wzpcl" placeholder />辆
            </FormItem>
            <FormItem label="劝返车辆数:" prop="qfcls" class="m-form-block">
              <Input v-model="formValidate1.qfcls" placeholder />辆
            </FormItem>
            <FormItem label="体温检测人员数:" prop="twjcrys" class="m-form-block">
              <Input v-model="formValidate1.twjcrys" placeholder />人
            </FormItem>
            <FormItem label="疫区人员数:" prop="yqrys" class="m-form-block">
              <Input v-model="formValidate1.yqrys" placeholder />人
            </FormItem>
            <FormItem label="发热人员数:" prop="frrys" class="m-form-block">
              <Input v-model="formValidate1.frrys" placeholder />人
            </FormItem>
            <FormItem label="遣返人员数:" prop="qfrys" class="m-form-block">
              <Input v-model="formValidate1.qfrys" placeholder />人
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel1()">取消</Button>
        <Button type="primary" size="large" @click="ok1()">确认</Button>
      </div>
    </Modal>
    <Modal
      title="查控车辆和人员"
      v-model="modal2"
      :mask-closable="true"
      :closable="true"
      scrollable
      width="800"
    >
      <div class="my-table">
        <Table :columns="columns2" :data="tabList2"></Table>
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
      <div slot="footer"></div>
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
      closed: true,
      formValidate1: {
        ckcls: "", //查控车辆数
        epcls: "", //鄂牌车辆数
        wzpcl: "", //温州牌车辆
        qfcls: "", //劝返车辆数
        twjcrys: "", //体温检测人员数
        yqrys: "", //疫区人员数
        frrys: "", //发热人员数
        qfrys: "" //遣返人员数
      },
      columns1: [
        {
          title: "最新修改时间",
          width: 250,
          slot: "edittime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.edittime), "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "修改人",
          width: 150,
          key: "editer"
        },
        {
          title: "查控车辆数",
          width: 150,
          key: "ckcls",
          render: (h, params) => {
            return h("div", params.row.ckcls + "辆");
          }
        },
        {
          title: "鄂牌车辆数",
          width: 150,
          key: "epcls",
          render: (h, params) => {
            return h("div", params.row.epcls + "辆");
          }
        },
        {
          title: "温州牌车辆",
          width: 150,
          key: "wzpcl",
          render: (h, params) => {
            return h("div", params.row.wzpcl + "辆");
          }
        },
        {
          title: "劝返车辆数",
          width: 150,
          key: "qfcls",
          render: (h, params) => {
            return h("div", params.row.qfcls + "辆");
          }
        },
        {
          title: "体温检测人员数",
          width: 150,
          key: "twjcrys",
          render: (h, params) => {
            return h("div", params.row.twjcrys + "人");
          }
        },
        {
          title: "疫区人员数",
          width: 150,
          key: "yqrys",
          render: (h, params) => {
            return h("div", params.row.yqrys + "人");
          }
        },
        {
          title: "发热人员数",
          width: 150,
          key: "frrys",
          render: (h, params) => {
            return h("div", params.row.frrys + "人");
          }
        },
        {
          title: "遣返人员数",
          width: 150,
          key: "qfrys",
          render: (h, params) => {
            return h("div", params.row.qfrys + "人");
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
        //   ckcls: "22", //查控车辆数
        //   epcls: "11", //鄂牌车辆数
        //   wzpcl: "11", //温州牌车辆
        //   qfcls: "11", //劝返车辆数
        //   twjcrys: "11", //体温检测人员数
        //   yqrys: "11", //疫区人员数
        //   frrys: "11", //发热人员数
        //   qfrys: "11" //遣返人员数
        // }
      ],
      columns2: [
        {
          title: "最新修改时间",
          width: 170,
          slot: "edittime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.edittime), "yyyy-MM-dd hh:mm:ss")
            );
          }
        },
        {
          title: "修改人",
          width: 150,
          key: "editer"
        },
        {
          title: "查控车辆数",
          width: 150,
          key: "ckcls",
          render: (h, params) => {
            return h("div", params.row.ckcls + "辆");
          }
        },
        {
          title: "鄂牌车辆数",
          width: 150,
          key: "epcls",
          render: (h, params) => {
            return h("div", params.row.epcls + "辆");
          }
        },
        {
          title: "温州牌车辆",
          width: 150,
          key: "wzpcl",
          render: (h, params) => {
            return h("div", params.row.wzpcl + "辆");
          }
        },
        {
          title: "劝返车辆数",
          width: 150,
          key: "qfcls",
          render: (h, params) => {
            return h("div", params.row.qfcls + "辆");
          }
        },
        {
          title: "体温检测人员数",
          width: 150,
          key: "twjcrys",
          render: (h, params) => {
            return h("div", params.row.twjcrys + "人");
          }
        },
        {
          title: "疫区人员数",
          width: 150,
          key: "yqrys",
          render: (h, params) => {
            return h("div", params.row.yqrys + "人");
          }
        },
        {
          title: "发热人员数",
          width: 150,
          key: "frrys",
          render: (h, params) => {
            return h("div", params.row.frrys + "人");
          }
        },
        {
          title: "遣返人员数",
          width: 150,
          key: "qfrys",
          render: (h, params) => {
            return h("div", params.row.qfrys + "人");
          }
        }
      ],
      tabList2: [
        // {
        //   edittime: "2019-11-07 19:09:20", //;最新修改时间
        //   editer: "小红", //修改人
        //   ckcls: "22", //查控车辆数
        //   epcls: "11", //鄂牌车辆数
        //   wzpcl: "11", //温州牌车辆
        //   qfcls: "11", //劝返车辆数
        //   twjcrys: "11", //体温检测人员数
        //   yqrys: "11", //疫区人员数
        //   frrys: "11", //发热人员数
        //   qfrys: "11" //遣返人员数
        // }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    searchFunc(data) {
      api.ckrcxgjl(data).then(res => {
        this.total = res.data.total;
        this.tabList2 = res.data.tabList;
      });
    },
    init() {
      api.ckrc().then(res => {
        if (res.code == "10000") {
          if (JSON.stringify(res.data) != "[{}]") {
            this.tabList1 = res.data;
            this.formValidate1 = this.tabList1[0];
          }
        }
      });
    },
    handleEdit() {
      //修改记录
      this.modal1 = true;
    },
    handleRecord() {
      //查看记录
      this.modal2 = true;
      this.searchFunc(this.pageSet);
    },
    handleDelete(row) {
      //删除
      api.delete({ type: "6", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.tabList1 = [];
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer);
      api.ckrcbc(obj).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.modal1 = false;
          this.init();
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
</style>
