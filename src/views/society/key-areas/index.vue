<template>
  <div class="wrap">
    <TopTitle :title="'疫情重点地区在昆实有人员情况'" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button @click="handleEdit()" type="info">修改数据</Button>
        <div class="my-table">
          <Table :columns="columns1" :data="tabList1">
            <template slot-scope="{ row }" slot="action">
              <Button
                class="my-table-handle-button"
                @click="handleRecord()"
                style="width:100px;"
              >修改记录</Button>
              <Button class="my-table-handle-button" @click="handleDelete(row)">删除</Button>
            </template>
          </Table>
        </div>
      </div>
    </transition>
    <Modal
      title="疫情重点地区在昆实有人员情况"
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
            <FormItem label="重点疫区人员总数:" prop="zdyqryzs" class="m-form-block">
              <Input v-model="formValidate1.zdyqryzs" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="湖北籍迁入人口:" prop="hbjqrrk" class="m-form-block">
              <Input v-model="formValidate1.hbjqrrk" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="湖北籍暂住人口:" prop="hbjzzrk" class="m-form-block">
              <Input v-model="formValidate1.hbjzzrk" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="武汉籍迁入人口:" prop="whjqrrk" class="m-form-block">
              <Input v-model="formValidate1.whjqrrk" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="武汉籍暂住人口:" prop="whjzzrk" class="m-form-block">
              <Input v-model="formValidate1.whjzzrk" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="温州籍迁入人口:" prop="wzjqrrk" class="m-form-block">
              <Input v-model="formValidate1.wzjqrrk" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="温州籍暂住人口:" prop="wzjzzrk" class="m-form-block">
              <Input v-model="formValidate1.wzjzzrk" placeholder />&nbsp;人
            </FormItem>
            <FormItem label="昆山人口总数:" prop="ksrkzs" class="m-form-block">
              <Input v-model="formValidate1.ksrkzs" placeholder />&nbsp;人
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel1()">取消</Button>
        <Button type="primary" size="large" @click="ok1('formValidate1')">确认</Button>
      </div>
    </Modal>
    <Modal
      title="疫情重点地区在昆实有人员情况修改记录"
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
      modal2: false,
      closed: false,
      formValidate1: {
        zdyqryzs: "", //重点疫区人员总数
        hbjqrrk: "", //湖北籍迁入人口
        hbjzzrk: "", //湖北籍暂住人口
        whjqrrk: "", //武汉籍迁入人口
        whjzzrk: "", //武汉籍暂住人口
        wzjqrrk: "", //温州籍迁入人口
        wzjzzrk: "", //温州籍暂住人口
        ksrkzs: "" //昆山人口总数
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
          title: "重点疫区人员总数",
          width: 150,
          key: "zdyqryzs",
          render: (h, params) => {
            return h("div", params.row.zdyqryzs + "人");
          }
        },
        {
          title: "湖北籍迁入人口",
          width: 150,
          key: "hbjqrrk",
          render: (h, params) => {
            return h("div", params.row.hbjqrrk + "人");
          }
        },
        {
          title: "湖北籍暂住人口",
          width: 150,
          key: "hbjzzrk",
          render: (h, params) => {
            return h("div", params.row.hbjzzrk + "人");
          }
        },
        {
          title: "武汉籍迁入人口",
          width: 150,
          key: "whjqrrk",
          render: (h, params) => {
            return h("div", params.row.whjqrrk + "人");
          }
        },
        {
          title: "武汉籍暂住人口",
          width: 150,
          key: "whjzzrk",
          render: (h, params) => {
            return h("div", params.row.whjzzrk + "人");
          }
        },
        {
          title: "温州籍迁入人口",
          width: 150,
          key: "wzjqrrk",
          render: (h, params) => {
            return h("div", params.row.wzjqrrk + "人");
          }
        },
        {
          title: "温州籍暂住人口",
          width: 150,
          key: "wzjzzrk",
          render: (h, params) => {
            return h("div", params.row.wzjzzrk + "人");
          }
        },
        {
          title: "昆山人口总数",
          width: 150,
          key: "ksrkzs",
          render: (h, params) => {
            return h("div", params.row.ksrkzs + "人");
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
        //   zdyqryzs: "11", //重点疫区人员总数
        //   hbjqrrk: "11", //湖北籍迁入人口
        //   hbjzzrk: "11", //湖北籍暂住人口
        //   whjqrrk: "11", //武汉籍迁入人口
        //   whjzzrk: "11", //武汉籍暂住人口
        //   wzjqrrk: "11", //温州籍迁入人口
        //   wzjzzrk: "11", //温州籍暂住人口
        //   ksrkzs: "11" //昆山人口总数
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
          title: "重点疫区人员总数",
          width: 150,
          key: "zdyqryzs",
          render: (h, params) => {
            return h("div", params.row.zdyqryzs + "人");
          }
        },
        {
          title: "湖北籍迁入人口",
          width: 150,
          key: "hbjqrrk",
          render: (h, params) => {
            return h("div", params.row.hbjqrrk + "人");
          }
        },
        {
          title: "湖北籍暂住人口",
          width: 150,
          key: "hbjzzrk",
          render: (h, params) => {
            return h("div", params.row.hbjzzrk + "人");
          }
        },
        {
          title: "武汉籍迁入人口",
          width: 150,
          key: "whjqrrk",
          render: (h, params) => {
            return h("div", params.row.whjqrrk + "人");
          }
        },
        {
          title: "武汉籍暂住人口",
          width: 150,
          key: "whjzzrk",
          render: (h, params) => {
            return h("div", params.row.whjzzrk + "人");
          }
        },
        {
          title: "温州籍迁入人口",
          width: 150,
          key: "wzjqrrk",
          render: (h, params) => {
            return h("div", params.row.wzjqrrk + "人");
          }
        },
        {
          title: "温州籍暂住人口",
          width: 150,
          key: "wzjzzrk",
          render: (h, params) => {
            return h("div", params.row.wzjzzrk + "人");
          }
        },
        {
          title: "昆山人口总数",
          width: 150,
          key: "ksrkzs",
          render: (h, params) => {
            return h("div", params.row.ksrkzs + "人");
          }
        }
      ],
      tabList2: [
        // {
        //   edittime: "2019-11-07 19:09:20", //;最新修改时间
        //   editer: "小红", //修改人
        //   zdyqryzs: "11", //重点疫区人员总数
        //   hbjqrrk: "11", //湖北籍迁入人口
        //   hbjzzrk: "11", //湖北籍暂住人口
        //   whjqrrk: "11", //武汉籍迁入人口
        //   whjzzrk: "11", //武汉籍暂住人口
        //   wzjqrrk: "11", //温州籍迁入人口
        //   wzjzzrk: "11", //温州籍暂住人口
        //   ksrkzs: "11" //昆山人口总数
        // }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    searchFunc(data) {
      api.zdyqxgjl(data).then(res => {
        this.total = res.data.total;
        this.tabList2 = res.data.tabList;
      });
    },
    init() {
      api.zdyq().then(res => {
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
      api.delete({ type: "1", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.tabList1 = [];
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer);
      api.zdyqbc(obj).then(res => {
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
