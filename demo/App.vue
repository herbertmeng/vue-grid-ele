<template>
  <div style="max-width: 1200px">
    <h1>Hello World</h1>
    <p>This is demo page for fss module.</p>
    <div class="m-table">
      <v-grid :data="data" height="500" border :columns="columns" @sort-change="handleSort" stripe/>
    </div>
    {{columnsTest.className}}
    <v-table :data="data">
      <v-table-column v-bind="columnsTest"></v-table-column>
    </v-table>

  </div>
</template>

<script type="text/jsx">
  import _ from 'lodash'
  import VGrid from '../src'
  const {table, tableColumn} = VGrid
  import VTable from "../src/packages/table/src/table.vue";
  let i = 0;
  const renderToolTip = function (h, {column, $index}) {
    return (<span>{column.label}</span>)
  }
  const renderPercent = function (column, row, value) {
    return value ? value + '%' : 0
  }
  export default {
    data: function () {
      let columns = [
        {
          label: '对比',
          fixed: true,
          width:50,
          type: 'selection'
        },
        {
          label: '序号',
          fixed: true,
          width:80,
          type: 'index'
        },
        {
          label: '行业',
          prop: 'industry',
          'render-header': renderToolTip,
          fixed: true,
          width:200,
          className:'x'
        },
        {
          label: '',
          width:150,
          render(h,{$index,cellIndex}){
            return (<button onClick={function () {
              alert(`已收藏第${$index+1}列`)
            }}>点击收藏{$index}-{cellIndex}</button>)
          },
          className:'td-border'
        },
        {
          label: '性别分布',
          children: [
            {
              label: '男',
              prop: 'male',
              formatter: renderPercent,
              width:100
            },
            {
              label: '女',
              prop: 'female',
              formatter: renderPercent,
              width:100,
              className:'td-border'
            }
          ]
        },
        {
          label: '年龄分布',
          children: [
            {
              label: '24岁以下',
              prop: '24',
              formatter: renderPercent,
              sortable: 'custom',
              width: 120,
            },
            {
              label: '25~30岁',
              prop: '25',
              formatter: renderPercent,
              sortable:true
            },
            {
              label: '31~35岁',
              prop: '31',
              formatter: renderPercent
            },
            {
              label: '36~40岁',
              prop: '36',
              formatter: renderPercent
            },
            {
              label: '41岁及以上',
              prop: '41',
              formatter: renderPercent,
              className:'td-border'
            }
          ]
        },
        {
          label: '消费能力',
          children: [
            {
              label: '高等消费者',
              'render-header': renderToolTip,
              prop: 'high',
              formatter: renderPercent
            },
            {
              label: '中高消费者',
              'render-header': renderToolTip,
              prop: 'highMedium',
              formatter: renderPercent
            },
            {
              label: '中等消费者',
              'render-header': renderToolTip,
              prop: 'medium',
              formatter: renderPercent
            },
            {
              label: '中低消费者',
              'render-header': renderToolTip,
              prop: 'lowMedium',
              formatter: renderPercent
            },
            {
              label: '低消费者',
              'render-header': renderToolTip,
              prop: 'low',
              formatter: renderPercent,
              className:'td-border'
            }
          ]
        },
        {
          label: '地域分布',
          children: [
            {
              label: '超一线城市',
              'render-header': renderToolTip,
              prop: 'superOne',
              formatter: renderPercent
            },
            {
              label: '一线城市',
              'render-header': renderToolTip,
              prop: 'one',
              formatter: renderPercent
            },
            {
              label: '二线城市',
              'render-header': renderToolTip,
              prop: 'two',
              formatter: renderPercent
            },
            {
              label: '三线城市',
              'render-header': renderToolTip,
              prop: 'three',
              formatter: renderPercent
            },
            {
              label: '非线级城市及其他',
              'render-header': renderToolTip,
              prop: 'four',
              formatter: renderPercent,
            }
          ]
        }
      ]
      const item = {
        industry: '儿童教育',
        male: 25,
        female: 75,
        24: 25,
        25: 75,
        31: 75,
        36: 75,
        41: 75,
        high: 75,
        highMedium: 75,
        medium: 75,
        lowMedium: 75,
        low: 75,
        superOne: 75,
        one: 75,
        two: 75,
        three: 75,
        four: 75
      }
      const data = _.shuffle(Array.from(Array(10), (v,i) => Object.assign({}, item, {24:i,male:i+1})));
      const saveData = _.cloneDeep(data)
      const resetCol = function (col) {
        col.align = 'center'
        col.resizable = false
        if(col.label&&!col.width){
          col.width = 40+col.label.length*20
        }
        if(col.children){
          col.className = col.className||'' + ' border'
          col.children.forEach(resetCol)
        }
      }
      columns.forEach(resetCol)
      return {
        data,
        columns,
        saveData,
        columnsTest:{
          label: '行业',
          prop: 'industry',
          'render-header': renderToolTip,
          fixed: true,
          width:200,
          className:'x'
        }
      }
    },
    methods: {
      handleSort({order,prop}){
        const fixedData = this.data.slice(0,3)
        let sortData = this.data.slice(3)
        if(order !== null){
          if(order === 'ascending'){
            sortData = sortData.sort((a,b)=>a[prop]-b[prop])
          }else if(order === 'descending'){
            sortData = sortData.sort((a,b)=>b[prop]-a[prop])
          }
          this.data = fixedData.concat(sortData)
        } else {
          this.restoreData()
        }
      },
      restoreData(){
        this.data = this.saveData
      }
    },
    created(){
      setInterval(()=>{
        this.columns[2].className = `x${i++}`
        this.columnsTest.className = `x${i++}`
      },2000)
    },
    components: {
      VTable,
      VGrid,
      [table.name]:table,
      [tableColumn.name]:tableColumn
    }
  }
</script>

