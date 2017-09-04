<template>
  <div style="max-width: 800px">
    <h1>Hello World</h1>
    <p>This is demo page for fss module.</p>
    <v-table :data="data" height="500" border :columns="columns"/>
  </div>
</template>

<script type="text/jsx">
  import VTable from '../src'
  const renderToolTip = function (h, {column, $index}) {
    return (<span>{column.label}?</span>)
  }
  const renderPercent = function (h,{column, row, $index}) {
    return row[column.property] ? row[column.property] + '%' : 0
  }
  export default {
    data: function () {
      const columns = [
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
          width:200
        },
        {
          label: '',
          width:150,
          render(h,{$index}){
            return (<button onClick={function () {
              alert(`已收藏第${$index+1}列`)
            }}>点击收藏</button>)
          }
        },
        {
          label: '性别分布',
          children: [
            {
              label: '男',
              prop: 'male',
              render: renderPercent
            },
            {
              label: '女',
              prop: 'female',
              render: renderPercent
            }
          ]
        },
        {
          label: '年龄分布',
          children: [
            {
              label: '24岁以下',
              prop: '24',
              render: renderPercent
            },
            {
              label: '25~30岁',
              prop: '25',
              render: renderPercent
            },
            {
              label: '31~35岁',
              prop: '31',
              render: renderPercent
            },
            {
              label: '36~40岁',
              prop: '36',
              render: renderPercent
            },
            {
              label: '41岁及以上',
              prop: '41',
              render: renderPercent
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
              render: renderPercent
            },
            {
              label: '中高消费者',
              'render-header': renderToolTip,
              prop: 'highMedium',
              render: renderPercent
            },
            {
              label: '中等消费者',
              'render-header': renderToolTip,
              prop: 'medium',
              render: renderPercent
            },
            {
              label: '中低消费者',
              'render-header': renderToolTip,
              prop: 'lowMedium',
              render: renderPercent
            },
            {
              label: '低消费者',
              'render-header': renderToolTip,
              prop: 'low',
              render: renderPercent
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
              render: renderPercent
            },
            {
              label: '一线城市',
              'render-header': renderToolTip,
              prop: 'one',
              render: renderPercent
            },
            {
              label: '二线城市',
              'render-header': renderToolTip,
              prop: 'two',
              render: renderPercent
            },
            {
              label: '三线城市',
              'render-header': renderToolTip,
              prop: 'three',
              render: renderPercent
            },
            {
              label: '非线级城市及其他',
              'render-header': renderToolTip,
              prop: 'four',
              render: renderPercent
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
      const data = Array.from(Array(100), () => Object.assign({}, item));
      return {
        data,
        columns,
      }
    },
    components: {
      VTable
    }
  }
</script>

