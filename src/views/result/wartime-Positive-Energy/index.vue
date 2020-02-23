<template>
  <div>
    <EditComponent
      title="战时正能量"
      type="17"
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
          name: "一次性口罩数",
          key: "ycxkzs",
          unit: "个"
        },
        {
          name: "N95口罩数",
          key: "n95",
          unit: "个"
        },
        {
          name: "护目镜数",
          key: "hmjs",
          unit: "个"
        },
        {
          name: "医用防护服数",
          key: "yyfhfs",
          unit: "个"
        }
      ]
    };
  }
};
</script>

<style></style>
