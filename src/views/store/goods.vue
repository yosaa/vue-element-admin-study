<template>
  <div class="goodListBox">
    <div>
      <el-tabs v-model="search.erp_type" @tab-click="handleClick">
        <el-tab-pane label="成品" name="1" />
        <el-tab-pane label="半成品" name="2" />
        <el-tab-pane label="包材" name="3" />
        <el-tab-pane label="快递耗材" name="4" />
        <el-tab-pane label="周边" name="5" />
      </el-tabs>
    </div>

    <div class="searchBox">
      <el-input v-model="search.name" placeholder="请输入商品名称" style=" width:200px;" />
      <el-input v-model="search.goods_id" placeholder="请输入商品id" style="margin-left:20px; width:200px;" />
      <el-input v-model="search.sku_id" placeholder="请输入商品编码" style="margin-left:20px; width:200px;" />
      <el-button type="primary" style="margin-left:20px;" @click="getGoodsList">搜索商品</el-button>
    </div>

    <div>
      <el-tabs v-if="['1', '5'].includes(search.erp_type)" v-model="search.level" @tab-click="handleClick">
        <el-tab-pane label="上架中" name="5" />
        <el-tab-pane label="已下架" name="0" />
      </el-tabs>
    </div>
    <div>
      <el-table
        :data="skuList"
        height="500"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="cover_url"
          label="封面图"
          width="90"
        >
          <template slot-scope="scope">
            <img :src="'https://oss.xiaomingtea.com/shop/' + scope.row.cover_url" style="width: 70px;">
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="商品名"
          width="280"
        />
        <el-table-column
          prop="selling_price"
          label="售价"
          width="180"
        />
        <el-table-column
          prop="inventory"
          label="库存"
        />
        <el-table-column
          prop="total_sold"
          label="已售"
        />
        <el-table-column
          prop="created_at"
          label="创建日期"
        />
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <a style="margin-right: 10px; color:#3AA6D0" @click="edit( scope.row )">编辑</a>
            <a style="margin-right: 10px;color:#3AA6D0" @click="edit">{{ search.level === '5' ? '下架' : '上架' }}</a>
            <a style="color:#3AA6D0" @click="edit">隐藏</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="totalElements"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import { getSkuList } from '@/api/store'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      totalElements: 0,
      search: {
        erp_type: '1',
        name: '',
        goods_id: '',
        sku_id: '',
        level: '5',
        page: 0,
        pageSize: 10
      },
      skuList: []
    }
  },
  created() {
    this.getGoodsList(this.search)
  },
  mounted() {},
  methods: {
    handleClick() {
      this.getGoodsList()
    },
    async getGoodsList() {
      if (!['1', '5'].includes(this.search.erp_type)) this.search.level = 0
      const { data } = await getSkuList(this.search, getToken())
      this.skuList = data.elements
      this.totalElements = data.totalElements
    },
    edit(info) {
      this.$router.push({ path: 'goods_edit', query: { info }})
    },
    handleCurrentChange(val) {
      this.search.page = val - 1
      this.getGoodsList() // 获取用户点击的当前页后刷新页面数据
    }
  }
}
</script>

<style lang=scss>
    .goodListBox{
        margin: 20px 20px 20px 20px;
        background-Color: rgb(255, 255, 255);
        padding:20px 5px 15px 20px;
    }
    .searchBox{
        display: flex;
        flex-direction: row;
        justify-content:flex-start ;
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>
