<template>
  <div>
    <EditComponent
      title="高位统筹"
      type="10"
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
          name: "召开会议次数",
          key: "zkhycs",
          unit: "次"
        },
        {
          name: "指导督导次数",
          key: "zdddcs",
          unit: "次"
        },
        {
          name: "关怀慰问次数",
          key: "ghwwcs",
          unit: "次"
        }
      ]
    };
  }
};
</script>

<style></style>
