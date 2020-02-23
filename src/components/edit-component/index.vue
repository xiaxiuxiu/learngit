<template>
  <div class="wrap">
    <TopTitle :title="title" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button @click="openEdit" type="info">修改数据</Button>
        <div class="my-table">
          <Table :columns="columns1" :data="tabList1">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                class="my-table-handle-button"
                @click="openRecord(row, index)"
                style="width:100px;"
              >
                修改记录
              </Button>
              <Button class="my-table-handle-button" @click="handleDelete(row)">
                删除
              </Button>
            </template>
          </Table>
        </div>
      </div>
    </transition>
    <Modal
      :title="title"
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
          ref="editForm"
          :rules="ruleValidate"
          label-position="left"
          :model="editData"
          :label-width="150"
        >
          <div class="form">
            <FormItem
              v-for="item in tabData"
              :key="item.key"
              :label="item.name + ':'"
              :prop="item.key"
              class="m-form-block w-100"
            >
              <Input
                v-model="editData[item.key]"
                :type="item.inputType || 'text'"
              />
              {{ item.unit }}
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="confirmEdit('editForm')">
          确认
        </Button>
      </div>
    </Modal>
    <Modal
      :title="title"
      v-model="modal2"
      :mask-closable="true"
      :closable="true"
      scrollable
      width="800"
    >
      <div class="my-table">
        <Table :columns="columns2" :data="tabList2"> </Table>
        <Page
          :total="total"
          :page-size="pageSize"
          @on-page-size-change="pageSizeChange"
          @on-change="pageChange"
          :current="pageNum"
          show-total
          class="my-table-page"
        />
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import TopTitle from "@/components/top-title/top-title";
import api from "@/api/result/index";
import page from "@/mixin/page";
import { formatDate } from "@/util/util";
export default {
  mixins: [page],
  props: ["title", "type", "tabData"],
  components: { TopTitle },
  data() {
    return {
      modal1: false,
      modal2: false,
      closed: false,
      editData: {},
      tabList1: [],
      tabList2: []
    };
  },
  mounted() {
    this.tabData.map(val => {
      this.$set(this.editData, val.key, "");
    });
    this.initPage();
  },
  computed: {
    columns1() {
      const result = [
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
        }
      ];
      this.tabData.map(val => {
        result.push({
          title: val.name,
          key: val.key,
          render: (h, params) => {
            return h("div", params.row[val.key] + (val.unit || ""));
          }
        });
      });
      result.push({
        title: "操作",
        width: 260,
        fixed: "right",
        slot: "action",
        key: "action",
        align: "center"
      });
      return result;
    },
    columns2() {
      const result = [
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
        }
      ];
      this.tabData.map(val => {
        result.push({
          title: val.name,
          key: val.key,
          render: (h, params) => {
            return h("div", params.row[val.key] + (val.unit || ""));
          }
        });
      });
      return result;
    },
    ruleValidate() {
      const result = {};
      this.tabData.map(val => {
        result[val.key] = [{ required: true, message: "字段不能为空！" }];
      });
      return result;
    }
  },
  methods: {
    initPage() {
      const type = this.type;
      api.get({ type }).then(res => {
        this.tabList1 = res.data;
      });
    },
    // 分页查询
    async searchFunc(data) {
      const type = this.type;
      const { pageNum, pageSize } = this;
      const result = await api.getRec({ type, pageNum, pageSize, ...data });
      this.tabList2 = result.data;
      this.total = result.total;
    },
    // 打开修改数据弹出页
    openEdit() {
      this.modal1 = true;
      if (this.tabList1.length > 0) {
        this.editData = { ...this.tabList1[0] };
      }
    },
    // 确认修改
    confirmEdit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const editer = sessionStorage.getItem("username");
          const type = this.type;
          const params = { type, ...this.editData, editer };
          api.edit(params).then(res => {
            if (res.code === 10000) {
              this.$Message.success("修改成功!");
              this.modal1 = false;
              this.initPage();
            } else {
              this.$Message.error("修改失败，请稍后重试！");
            }
          });
        }
      });
    },
    // 查看记录
    openRecord() {
      this.modal2 = true;
      this.searchFunc();
    },
    // 删除
    async handleDelete(row) {
      const id = row.id;
      const type = this.type;
      const result = await api.delete({ id, type });
      if (result.code === 10000) {
        this.$Message.success("删除成功！");
        this.initPage();
      } else {
        this.$Message.error("删除失败，请稍后重试！");
      }
    },
    // 取消修改
    cancel() {
      this.modal1 = false;
    }
  }
};
</script>

<style scoped lang="less">
@import url("../../styles/index2.less");
</style>
