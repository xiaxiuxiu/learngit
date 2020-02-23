<template>
  <div class="wrap">
    <TopTitle :title="'汇聚涉疫重点数据情况'" v-model="closed" />
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
      title="汇聚涉疫重点数据情况"
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      scrollable
      width="800"
    >
      <div>
        <Form ref="formValidate1" label-position="left" :model="formValidate1" :label-width="150">
          <div class="form">
            <FormItem label="数据名称:" prop="sjmc" class="m-form-block w-100">
              <Input v-model="formValidate1.sjmc" placeholder type="textarea" :rows="4" />
            </FormItem>
            <FormItem label="数据来源:" prop="sjly" class="m-form-block w-100">
              <Input v-model="formValidate1.sjly" placeholder type="textarea" :rows="4" />
            </FormItem>
            <FormItem label="数据量:" prop="sjl" class="m-form-block w-100">
              <Input v-model="formValidate1.sjl" placeholder />条
            </FormItem>
            <FormItem label="汇集时间:" prop="hjsj" class="m-form-block">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd hh:mm:ss"
                @on-change="DateChange"
                :value="formValidate1.hjsj"
              ></DatePicker>
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
      add: false,
      closed: true,
      formValidate1: {
        sjmc: "", //数据名称
        sjly: "", //数据来源
        sjl: "", //数据量
        hjsj: "" //时间
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
          title: "数据名称",
          width: 150,
          key: "sjmc"
        },
        {
          title: "数据来源",
          width: 150,
          key: "sjly"
        },
        {
          title: "数据量",
          width: 160,
          key: "sjl",
          render: (h, params) => {
            return h("div", params.row.sjl + "条");
          }
        },
        {
          title: "汇集时间",
          width: 180,
          key: "hjsj",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.hjsj), "yyyy-MM-dd hh:mm:ss")
            );
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
        //   sjmc: "22", //数据名称
        //   sjly: "11", //数据来源
        //   sjl: "11", //数据量
        //   time: "2020/1/28 16:54:21" //汇集时间
        // }
      ]
    };
  },
  mounted() {
    this.searchFunc(this.pageSet);
  },
  methods: {
    searchFunc(data) {
      api.zdsj(data).then(res => {
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
      api.delete({ type: "2", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.searchFunc(this.pageSet);
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer, { id: "" });
      api.zdsjxg(obj).then(res => {
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
      api.zdsjxg(obj).then(res => {
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
    DateChange(e) {
      this.formValidate1.hjsj = formatDate(new Date(e), "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped lang="less">
@import url("../../../styles/index2.less");
</style>
