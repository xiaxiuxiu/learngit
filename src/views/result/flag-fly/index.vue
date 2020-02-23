<template>
  <div>
    <EditComponent
      title="党旗飘扬"
      type="11"
      :tab-data="tabData"
    ></EditComponent>
  </div>
</template>

<script>
import EditComponent from "@/components/edit-component";
export default {
  components: { EditComponent },
  data() {
    return {
      tabData: [
        {
          name: "临时党总支数",
          key: "lsdzzs",
          unit: "个"
        },
        {
          name: "临时党支部数",
          key: "lsdzbs",
          unit: "个"
        },
        {
          name: "火线入党数",
          key: "hxrds",
          unit: "个"
        },
        {
          name: "请战书数",
          key: "qzss",
          unit: "个"
        }
      ]
    };
  }
};
</script>

<style></style>
