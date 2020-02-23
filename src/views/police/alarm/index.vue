<template>
  <div class="wrap">
    <TopTitle :title="'涉疫接警数据'" v-model="closed" />
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
              <span v-if="row.jjzl == 1">群众举报</span>
              <span v-if="row.jjzl == 2">咨询反馈</span>
              <span v-if="row.jjzl == 3">医院反馈</span>
              <span v-if="row.jjzl == 4">其他</span>
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
      title="涉疫接警数据"
      v-model="modal1"
      :mask-closable="false"
      :closable="false"
      scrollable
      width="800"
    >
      <div>
        <Form ref="formValidate1" label-position="left" :model="formValidate1" :label-width="150">
          <div class="form">
            <FormItem label="汇集时间:" prop="jjtime" class="m-form-block w-100">
              <DatePicker
                type="datetime"
                format="yyyy-MM-dd"
                :value="formValidate1.jjtime"
                @on-change="DateChange"
              ></DatePicker>
            </FormItem>
            <FormItem label="接警数:" prop="jjs" class="m-form-block w-100">
              <Input v-model="formValidate1.jjs" placeholder />
            </FormItem>
            <FormItem label="接警种类:" prop="jjzl" class="m-form-block w-100">
              <Select v-model="formValidate1.jjzl" :transfer="true">
                <Option value="1">群众举报</Option>
                <Option value="2">咨询反馈</Option>
                <Option value="3">医院反馈</Option>
                <Option value="4">其他</Option>
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
      closed: true,
      formValidate1: {
        jjtime: "", //汇集时间
        jjs: "", //接警数
        jjzl: "" //接警种类
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
              formatDate(new Date(params.row.edittime), "yyyy-MM-dd")
            );
          }
        },
        {
          title: "修改人",
          width: 150,
          key: "editer"
        },
        {
          title: "接警种类",
          width: 150,
          key: "jjzl",
          slot: "jjzl"
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
          title: "接警数",
          width: 150,
          key: "jjs"
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
        //   jjzl: "22", //接警种类
        //   jjtime: "11", //接警日期
        //   jjs: "1" //接警数
        // }
      ]
    };
  },
  mounted() {
    this.searchFunc(this.pageSet);
  },
  methods: {
    searchFunc(data) {
      api.jjsj(data).then(res => {
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
      api.delete({ type: "7", id: row.id }).then(res => {
        if (res.code == "10000") {
          this.$Message.success("成功!");
          this.searchFunc(this.pageSet);
        }
      });
    },
    ok1() {
      //提交表单
      let obj = Object.assign({}, this.formValidate1, this.editer, { id: "" });
      api.jjsjgx(obj).then(res => {
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
      api.jjsjgx(obj).then(res => {
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
