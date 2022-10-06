<script lang="ts" setup>
import type { TableRowSelection } from '@arco-design/web-vue/es/table/interface'
import TableToolBar from '@/components/TableToolBar/index.vue'

const showSearch = ref(true)
const tableLoading = ref(false)
// const total = ref(0)
const queryForm = reactive({
  title: '',
  page: 0,
  limit: '',
})

const data = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
])

const selectedKeys = ref([])

const rowSelection: TableRowSelection = {
  type: 'checkbox',
  showCheckedAll: true,
}

// const tableData = reactive({
//   data: [],
// })

const onSearch = () => {
  alert('add')
}

const onReset = () => {
  alert('add')
}

const addNew = () => {
  alert('add')
}

const getList = () => {
  alert('add')
}

// const handleSelectionChange = () => {
//   alert('add')
// }

const handleEdit = (record: any) => {
  console.log(record)
  alert('add')
}

const handleDelete = (record: any) => {
  console.log(record)
  alert('add')
}
</script>
<template>
  <a-card class="app-job-list">
    <transition enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOut" :duration="800">
      <div class="app-card-header" v-show="showSearch">
        <a-form :model="queryForm" layout="inline" @submit.prevent>
          <a-form-item label="名称">
            <a-input v-model="queryForm.title" :style="{ width: '320px' }" placeholder="请输入名称" @keyup.enter="onSearch" />
          </a-form-item>
          <a-form-item>
            <a-space :size="10">
              <a-button type="primary" @click="onSearch">
                <template #icon>
                  <icon-search />
                </template>
                <template #default>查询</template>
              </a-button>
              <a-button @click="onReset">
                <template #icon>
                  <icon-refresh />
                </template>
                <template #default>重置</template>
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </transition>
    <div class="app-card-body">
      <div class="app-table-action">
        <div class="app-table-btn">
          <a-space :size="10">
            <a-button type="primary" @click="addNew">
              <template #icon>
                <icon-search />
              </template>
              <template #default>新增</template>
            </a-button>
            <a-button type="outline" status="danger" @click="addNew">
              <template #icon>
                <icon-delete />
              </template>
              <template #default>删除</template>
            </a-button>
          </a-space>
        </div>
        <div class="app-table-action-right">
          <table-tool-bar v-model:show-search.sync="showSearch" @query-table="getList" />
        </div>
      </div>
      <!-- /table-action -->
      <div class="app-table-container">
        <a-table :data="data" :loading="tableLoading" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys">
          <template #columns>
            <a-table-column title="name" data-index="name" />
            <a-table-column title="salary" data-index="salary" />
            <a-table-column title="address" data-index="address" />
            <a-table-column title="email" data-index="email" />
            <a-table-column title="操作">
              <template #cell="{ record }">
                <a-space :size="15">
                  <a-button type="text" @click="handleEdit(record)">
                    <template #icon>
                      <icon-edit />
                    </template>
                    <template #default>修改</template>
                  </a-button>
                  <a-button type="text" status="danger" @click="handleDelete(record)">
                    <template #icon>
                      <icon-delete />
                    </template>
                    <template #default>删除</template>
                  </a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <!-- /table-container -->
    </div>
  </a-card>
</template>
<style lang="scss"></style>
