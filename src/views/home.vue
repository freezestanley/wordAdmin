<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">日浏览：{{dayViews}} 次</el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">月浏览：{{monthViews}} 次</el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">日查询：{{dayQueries}} 次</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dayViews: 10000,
      monthViews: 32000,
      dayQueries: 46700,
    };
  },
};
</script>

<style scoped>
</style>
