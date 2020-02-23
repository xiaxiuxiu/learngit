<template>
  <div class="wrap">
    <TopTitle :title="'重点防控工作情况'" v-model="closed" />
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
              <Button class="my-table-handle-button" @click="hhandleDelete(row)">删除</Button>
            </template>
          </Table>
        </div>
      </div>
    </transition>
    <Modal
      title="重点防控工作情况"
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
            <FormItem label="关闭场馆数:" prop="gbcgs" class="m-form-block">
              <Input v-model="formValidate1.gbcgs" placeholder />
            </FormItem>
            <FormItem label="取消活动数:" prop="qxhds" class="m-form-block">
              <Input v-model="formValidate1.qxhds" placeholder />
            </FormItem>
            <FormItem label="延期活动数:" prop="yqhds" class="m-form-block">
              <Input v-model="formValidate1.yqhds" placeholder />
            </FormItem>
            <FormItem label="走访工地数:" prop="zfgds" class="m-form-block">
              <Input v-model="formValidate1.zfgds" placeholder />
            </FormItem>
            <FormItem label="摸排外来务工人员数:" prop="mpwl" class="m-form-block">
              <Input v-model="formValidate1.mpwl" placeholder />
            </FormItem>
            <FormItem label="疫情重点地区人员数:" prop="yqzddqrys" class="m-form-block">
              <Input v-model="formValidate1.yqzddqrys" placeholder />
            </FormItem>
            <FormItem label="巡查涉昆网站数:" prop="xcskwzs" class="m-form-block">
              <Input v-model="formValidate1.xcskwzs" placeholder />
            </FormItem>
            <FormItem label="巡查社交群体数:" prop="xcsjqts" class="m-form-block">
              <Input v-model="formValidate1.xcsjqts" placeholder />
            </FormItem>
            <FormItem label="新增疫区文帖数:" prop="xzyqwts" class="m-form-block">
              <Input v-model="formValidate1.xzyqwts" placeholder />
            </FormItem>
            <FormItem label="新增疫区微博数:" prop="xzyqwbs" class="m-form-block">
              <Input v-model="formValidate1.xzyqwbs" placeholder />
            </FormItem>
            <FormItem label="处置谣言、制造恐慌情绪舆论数:" prop="czyy" class="m-form-block">
              <Input v-model="formValidate1.czyy" placeholder />
            </FormItem>
            <FormItem label="屏蔽拦截违规帖文数:" prop="pbljwts" class="m-form-block">
              <Input v-model="formValidate1.pbljwts" placeholder />
            </FormItem>
            <FormItem label="关停场所数:" prop="gtcss" class="m-form-block">
              <Input v-model="formValidate1.gtcss" placeholder />
            </FormItem>
            <FormItem label="检查场所数:" prop="jccss" class="m-form-block">
              <Input v-model="formValidate1.jccss" placeholder />
            </FormItem>
            <FormItem label="关停活禽交易场所数:" prop="gthqjy" class="m-form-block">
              <Input v-model="formValidate1.gthqjy" placeholder />
            </FormItem>
            <FormItem label="消毒活禽交易场面积:" prop="xdhqjy" class="m-form-block">
              <Input v-model="formValidate1.xdhqjy" placeholder />
            </FormItem>
            <FormItem label="取消国内旅游数:" prop="qxgnlys" class="m-form-block">
              <Input v-model="formValidate1.qxgnlys" placeholder />
            </FormItem>
            <FormItem label="国内旅游涉及人数:" prop="gnlysjrs" class="m-form-block">
              <Input v-model="formValidate1.gnlysjrs" placeholder />
            </FormItem>
            <FormItem label="取消境外旅游团数:" prop="qxjwlyts" class="m-form-block">
              <Input v-model="formValidate1.qxjwlyts" placeholder />
            </FormItem>
            <FormItem label="境外旅游团涉及人数:" prop="jwlytsjrs" class="m-form-block">
              <Input v-model="formValidate1.jwlytsjrs" placeholder />
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
      title="重点防控工作情况"
      v-model="modal2"
      :mask-closable="false"
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
      // formValidate1: {
      //   gbcgs: "22", //关闭场馆数
      //   qxhds: "11", //取消活动数
      //   yqhds: "11", //延期活动数
      //   zfgds: "11", //走访工地数
      //   mpwl: "11", //摸排外来务工人员数
      //   yqzddqrys: "11", //疫情重点地区人员数
      //   xcskwzs: "11", //巡查涉昆网站数
      //   xcsjqts: "11", //巡查社交群体数
      //   xzyqwts: "11", //新增疫区文帖数
      //   xzyqwbs: "11", //新增疫区微博数
      //   czyy: "11", //处置谣言、制造恐慌情绪舆论数
      //   pbljwts: "11", //屏蔽拦截违规帖文数
      //   gtcss: "11", //关停场所数
      //   jccss: "11", //检查场所数
      //   gthqjy: "11", //关停活禽交易场所数
      //   xdhqjy: "11", //消毒活禽交易场面积
      //   qxgnlys: "11", //取消国内旅游数
      //   gnlysjrs: "11", //国内旅游涉及人数
      //   qxjwlyts: "11", //取消境外旅游团数
      //   jwlytsjrs: "11" //境外旅游团涉及人数
      // },
      formValidate1: {
        gbcgs: "", //关闭场馆数
        qxhds: "", //取消活动数
        yqhds: "", //延期活动数
        zfgds: "", //走访工地数
        mpwl: "", //摸排外来务工人员数
        yqzddqrys: "", //疫情重点地区人员数
        xcskwzs: "", //巡查涉昆网站数
        xcsjqts: "", //巡查社交群体数
        xzyqwts: "", //新增疫区文帖数
        xzyqwbs: "", //新增疫区微博数
        czyy: "", //处置谣言、制造恐慌情绪舆论数
        pbljwts: "", //屏蔽拦截违规帖文数
        gtcss: "", //关停场所数
        jccss: "", //检查场所数
        gthqjy: "", //关停活禽交易场所数
        xdhqjy: "", //消毒活禽交易场面积
        qxgnlys: "", //取消国内旅游数
        gnlysjrs: "", //国内旅游涉及人数
        qxjwlyts: "", //取消境外旅游团数
        jwlytsjrs: "" //境外旅游团涉及人数
      },
      columns1: [
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
          title: "关闭场馆数",
          width: 150,
          key: "gbcgs"
        },
        {
          title: "取消活动数",
          width: 150,
          key: "qxhds"
        },
        {
          title: "延期活动数",
          width: 150,
          key: "yqhds"
        },
        {
          title: "走访工地数",
          width: 150,
          key: "zfgds"
        },
        {
          title: "摸排外来务工人员数",
          width: 170,
          key: "mpwl"
        },
        {
          title: "疫情重点地区人员数",
          width: 170,
          key: "yqzddqrys"
        },
        {
          title: "巡查涉昆网站数",
          width: 150,
          key: "xcskwzs"
        },
        {
          title: "巡查社交群体数",
          width: 150,
          key: "xcsjqts"
        },
        {
          title: "新增疫区文帖数",
          width: 150,
          key: "xzyqwts"
        },
        {
          title: "新增疫区微博数",
          width: 150,
          key: "xzyqwbs"
        },
        {
          title: "处置谣言、制造恐慌情绪舆论数",
          width: 250,
          key: "czyy"
        },
        {
          title: "屏蔽拦截违规帖文数",
          width: 170,
          key: "pbljwts"
        },
        {
          title: "关停场所数",
          width: 150,
          key: "gtcss"
        },
        {
          title: "检查场所数",
          width: 150,
          key: "jccss"
        },
        {
          title: "关停活禽交易场所数",
          width: 170,
          key: "gthqjy"
        },
        {
          title: "消毒活禽交易场面积",
          width: 170,
          key: "xdhqjy"
        },
        {
          title: "取消国内旅游数",
          width: 150,
          key: "qxgnlys"
        },
        {
          title: "国内旅游涉及人数",
          width: 160,
          key: "gnlysjrs"
        },
        {
          title: "取消境外旅游团数",
          width: 160,
          key: "qxjwlyts"
        },
        {
          title: "境外旅游团涉及人数",
          width: 170,
          key: "jwlytsjrs"
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
        //   gbcgs: "22", //关闭场馆数
        //   qxhds: "11", //取消活动数
        //   yqhds: "11", //延期活动数
        //   zfgds: "11", //走访工地数
        //   mpwl: "11", //摸排外来务工人员数
        //   yqzddqrys: "11", //疫情重点地区人员数
        //   xcskwzs: "11", //巡查涉昆网站数
        //   xcsjqts: "11", //巡查社交群体数
        //   xzyqwts: "11", //新增疫区文帖数
        //   xzyqwbs: "11", //新增疫区微博数
        //   czyy: "11", //处置谣言、制造恐慌情绪舆论数
        //   pbljwts: "11", //屏蔽拦截违规帖文数
        //   gtcss: "11", //关停场所数
        //   jccss: "11", //检查场所数
        //   gthqjy: "11", //关停活禽交易场所数
        //   xdhqjy: "11", //消毒活禽交易场面积
        //   qxgnlys: "11", //取消国内旅游数
        //   gnlysjrs: "11", //国内旅游涉及人数
        //   qxjwlyts: "11", //取消境外旅游团数
        //   jwlytsjrs: "11" //境外旅游团涉及人数
        // }
      ],
      columns2: [
        {
          title: "最新修改时间",
          width: 150,
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
          title: "关闭场馆数",
          width: 150,
          key: "gbcgs"
        },
        {
          title: "取消活动数",
          width: 150,
          key: "qxhds"
        },
        {
          title: "延期活动数",
          width: 150,
          key: "yqhds"
        },
        {
          title: "走访工地数",
          width: 150,
          key: "zfgds"
        },
        {
          title: "摸排外来务工人员数",
          width: 170,
          key: "mpwl"
        },
        {
          title: "疫情重点地区人员数",
          width: 170,
          key: "yqzddqrys"
        },
        {
          title: "巡查涉昆网站数",
          width: 150,
          key: "xcskwzs"
        },
        {
          title: "巡查社交群体数",
          width: 150,
          key: "xcsjqts"
        },
        {
          title: "新增疫区文帖数",
          width: 150,
          key: "xzyqwts"
        },
        {
          title: "新增疫区微博数",
          width: 150,
          key: "xzyqwbs"
        },
        {
          title: "处置谣言、制造恐慌情绪舆论数",
          width: 250,
          key: "czyy"
        },
        {
          title: "屏蔽拦截违规帖文数",
          width: 170,
          key: "pbljwts"
        },
        {
          title: "关停场所数",
          width: 150,
          key: "gtcss"
        },
        {
          title: "检查场所数",
          width: 150,
          key: "jccss"
        },
        {
          title: "关停活禽交易场所数",
          width: 170,
          key: "gthqjy"
        },
        {
          title: "消毒活禽交易场面积",
          width: 170,
          key: "xdhqjy"
        },
        {
          title: "取消国内旅游数",
          width: 150,
          key: "qxgnlys"
        },
        {
          title: "国内旅游涉及人数",
          width: 160,
          key: "gnlysjrs"
        },
        {
          title: "取消境外旅游团数",
          width: 160,
          key: "qxjwlyts"
        },
        {
          title: "境外旅游团涉及人数",
          width: 170,
          key: "jwlytsjrs"
        }
      ],
      tabList2: [
        // {
        //   edittime: "2019-11-07 19:09:20", //;最新修改时间
        //   editer: "小红", //修改人
        //   gbcgs: "22", //关闭场馆数
        //   qxhds: "11", //取消活动数
        //   yqhds: "11", //延期活动数
        //   zfgds: "11", //走访工地数
        //   mpwl: "11", //摸排外来务工人员数
        //   yqzddqrys: "11", //疫情重点地区人员数
        //   xcskwzs: "11", //巡查涉昆网站数
        //   xcsjqts: "11", //巡查社交群体数
        //   xzyqwts: "11", //新增疫区文帖数
        //   xzyqwbs: "11", //新增疫区微博数
        //   czyy: "11", //处置谣言、制造恐慌情绪舆论数
        //   pbljwts: "11", //屏蔽拦截违规帖文数
        //   gtcss: "11", //关停场所数
        //   jccss: "11", //检查场所数
        //   gthqjy: "11", //关停活禽交易场所数
        //   xdhqjy: "11", //消毒活禽交易场面积
        //   qxgnlys: "11", //取消国内旅游数
        //   gnlysjrs: "11", //国内旅游涉及人数
        //   qxjwlyts: "11", //取消境外旅游团数
        //   jwlytsjrs: "11" //境外旅游团涉及人数
        // }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    searchFunc(data) {
      api.zdfkgjl(data).then(res => {
        this.total = res.data.total;
        this.tabList2 = res.data.tabList;
      });
    },
    init() {
      api.zdfk().then(res => {
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
    hhandleDelete(row) {
      //删除
      api.delete({ type: "8", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.tabList1 = [];
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer);
      api.zdfkbc(obj).then(res => {
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
