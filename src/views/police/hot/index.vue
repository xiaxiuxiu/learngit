<template>
  <div class="wrap">
    <TopTitle :title="'热门舆情'" v-model="closed" />
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
            <template slot-scope="{ row }" slot="jjzl">
              <span v-if="row.jjzl == 1">1群众举报</span>
              <span v-if="row.jjzl == 2">2咨询反馈</span>
              <span v-if="row.jjzl == 3">3医院反馈</span>
              <span v-else>4其他</span>
            </template>
            <template slot-scope="{ row }" slot="action">
              <Button
                class="my-table-handle-button"
                @click="handleEdit(row)"
                style="width:100px;"
              >修改</Button>
              <Button class="my-table-handle-button" @click="handleDelete(row)">删除</Button>
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
      title="热门舆情"
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      scrollable
      width="800"
    >
      <div>
        <Form ref="formValidate1" label-position="left" :model="formValidate1" :label-width="150">
          <div class="form">
            <FormItem label="舆情时间:" prop="jjtime" class="m-form-block w-100">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd"
                :value="formValidate1.jjtime"
                @on-change="DateChange"
              ></DatePicker>
            </FormItem>
            <FormItem label="舆情内容:" prop="yqnr" class="m-form-block w-100">
              <Input
                v-model="formValidate1.yqnr"
                placeholder
                type="textarea"
                :rows="4"
                maxlength="500"
                show-word-limit
              />
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
      closed: true,
      formValidate1: {
        jjtime: "", //舆情时间
        yqnr: "" //舆情内容
      },
      //   ruleValidate1: {
      //     sjmc: [{ required: true, trigger: "blur", message: "必填项" }],
      //     sjly: [{ required: true, trigger: "blur", message: "必填项" }],
      //     sjl: [{ required: true, trigger: "blur", message: "必填项" }]
      //   },
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
          title: "接警日期",
          slot: "jjtime",
          render: (h, params) => {
            return h(
              "div",
              formatDate(new Date(params.row.jjtime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "舆情内容",
          width: 350,
          key: "yqnr"
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
        //   jjtime: "11", //接警日期
        //   yqnr: "1" //接警数
        // }
      ]
    };
  },
  mounted() {
    this.searchFunc(this.pageSet);
  },
  methods: {
    searchFunc(data) {
      api.rmyq(data).then(res => {
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
      api.delete({ type: "9", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.searchFunc(this.pageSet);
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer, { id: "" });
      api.rmyqgx(obj).then(res => {
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
      api.rmyqgx(obj).then(res => {
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
      this.formValidate1.jjtime = formatDate(new Date(e), "yyyy-MM-dd");
    }
  }
};
</script>

<style scoped lang="less">
@import url("../../../styles/index2.less");
</style>
