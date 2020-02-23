<template>
  <div class="">
    <!-- 巡防力量情况 -->
    <Patrolforce />
    <!-- 查控车辆和人员 -->
    <CarPeople />
    <!-- 涉疫接警数据 -->
    <Alarm />
    <!-- 重点防控工作情况 -->
    <Keyprevention />
    <!-- 热门舆情 -->
    <Hot />
  </div>
</template>

<script>
import Patrolforce from "./patrol-force/index";
import CarPeople from "./car-people/index";
import Alarm from "./alarm/index";
import Keyprevention from "./key-prevention/index";
import Hot from "./hot/index";
export default {
  components: {
    Patrolforce,
    CarPeople,
    Alarm,
    Keyprevention,
    Hot
  }
};
</script>

<style scoped lang="less"></style>
