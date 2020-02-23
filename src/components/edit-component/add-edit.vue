<template>
  <div class="wrap">
    <TopTitle :title="title" v-model="closed" />
    <transition name="slide">
      <div class="wrap-form" v-if="!closed">
        <Button @click="openAdd" type="info">新增数据</Button>
        <div class="my-table">
          <Table :columns="columns" :data="tabList">
            <template slot-scope="{ row }" slot="action">
              <Button class="my-table-handle-button" @click="openEdit(row)">
                修改
              </Button>
              <Button class="my-table-handle-button" @click="handleDelete(row)">
                删除
              </Button>
            </template>
          </Table>
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
      </div>
    </transition>
    <Modal
      :title="modalName"
      v-model="modal"
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
              <Select
                style="width: 50px"
                v-if="item.isSelector"
                v-model="editData.show"
                :transfer="true"
              >
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
              <DatePicker
                v-else-if="item.isDate"
                type="date"
                format="yyyy-MM-dd"
                v-model="editData[item.key]"
              ></DatePicker>
              <Input
                v-else
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
  components: {
    TopTitle
  },
  data() {
    return {
      modal: false,
      closed: false,
      isAdd: false,
      editData: {},
      tabList: []
    };
  },
  mounted() {
    this.tabData.map(val => {
      this.$set(this.editData, val.key, "");
    });
    this.initPage();
  },
  computed: {
    modalName() {
      return this.isAdd ? "新增" : "修改";
    },
    columns() {
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
            let value = params.row[val.key] + (val.unit || "");
            if (val.key == "show") {
              value = params.row[val.key] == 1 ? "是" : "否";
            }
            return h("div", value);
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
    ruleValidate() {
      const result = {};
      this.tabData.map(val => {
        result[val.key] = [{ required: true }];
      });
      return result;
    }
  },
  methods: {
    initPage() {
      const { type, pageNum, pageSize } = this;
      api.get({ type, pageNum, pageSize }).then(res => {
        this.tabList = res.data;
        this.total = res.total;
      });
    },
    // 分页查询
    async searchFunc(data) {
      const type = this.type;
      const result = await api.getRec({ type, ...data });
      this.tabList2 = result.data;
      this.total = result.total;
    },
    // 打开新增数据弹出页
    openAdd() {
      this.modal = true;
      this.isAdd = true;
      this.tabData.map(val => {
        let value = "";
        if (val.key == "show") {
          value = "0";
        }
        if (val.key == "date") {
          value = new Date();
        }
        this.$set(this.editData, val.key, value);
      });
    },
    // 确认修改
    confirmEdit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          const editer = sessionStorage.getItem("username");
          const params = { ...this.editData, editer };
          const result = this.isAdd
            ? await api.add(params)
            : await api.edit(params);
          if (result.code === 10000) {
            this.$Message.success(this.modalName + "成功!");
            this.modal = false;
            this.initPage();
          } else {
            this.$Message.error("修改失败，请稍后重试！");
          }
        }
      });
    },
    // 查看记录
    openEdit(row) {
      this.modal = true;
      this.isAdd = false;
      this.editData = { ...row };
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
      this.modal = false;
    }
  }
};
</script>

<style scoped lang="less">
@import url("../../styles/index2.less");
</style>
