<template>
  <div>
    <EditComponent
      title="涉疫打击"
      type="12"
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
          name: "打击团伙数",
          key: "djths",
          unit: "个"
        },
        {
          name: "涉及人数",
          key: "sjrs",
          unit: "个"
        },
        {
          name: "涉及物资数",
          key: "sjwzs",
          unit: "万元"
        }
      ]
    };
  }
};
</script>

<style></style>
