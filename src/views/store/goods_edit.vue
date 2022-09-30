<template>
  <div class = "infoBox">
    <el-form ref="form" :model="form" label-width="80px">
      <img :src="'https://oss.xiaomingtea.com/shop/' + info.cover_url" style="width: 20%;margin-left: 15%;margin: 30px;">
      <el-form-item label="商品名称" style="width: 50%">
        <el-input v-model="info.name" />
      </el-form-item>
      <el-form-item label="售价" style="width: 50%">
        <el-input v-model="info.selling_price" />
      </el-form-item>
      <el-form-item label="库存" style="width: 50%">
        <el-input v-model="info.inventory" />
      </el-form-item>
      <el-form-item label="已售" style="width: 50%">
        <el-input v-model="info.total_sold" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="putSkuInfo">立即更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: this.$route.query.info
    }
  },
  created() {},
  mounted() {},
  methods: {
    putSkuInfo() {
      alert('修改成功')
    }
  }
}
</script>

<style lang=scss>
.infoBox{
        margin: 20px 20px 20px 20px;
        background-Color: rgb(255, 255, 255);
        padding:20px 5px 15px 20px;
    }
</style>
