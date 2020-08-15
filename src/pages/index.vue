<template>
  <div>
    <div>
      <input type="text" v-model="query" />
    </div>
    <div>
      <button @click="search">文字列全文検索</button>
    </div>
    <ul
      v-for="test in testList" 
      :key="test.objectID"
    >
      <li>
        <div>文字列: {{ test.string }}</div>
        <div>改行文字列: {{ test.text }}</div>
        <div>数値: {{ test.number }}</div>
        <div>フラグ: {{ test.bool }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as algoliasearch from 'algoliasearch'
import algoliaClient from '~/plugins/algoliasearch'

const index = algoliaClient.initIndex('tests');

export default {
  data () {
    return {
      query: '',
      testList: []
    }
  },
  async created() {
    const result = await index.search("");
    console.warn(result);
    this.testList = result.hits;
  },
  methods: {
    // 変更がないため他のメソッドは省略
    async search (flag = null) {
      let query = this.query
      if (flag !== null) {
        query = parseInt(query);
      }
      console.warn(query);
      const result = await index.search(this.query, {
        "getRankingInfo": true,
        "analytics": false,
        "enableABTest": false,
        "hitsPerPage": 10,
        "attributesToRetrieve": "*",
        "attributesToSnippet": "*:20",
        "snippetEllipsisText": "…",
        "responseFields": "*",
        "page": 0,
        "facets": [
          "*"
        ]
      });
      console.warn(result);
      this.testList = result.hits;
    }
  }
}
</script>
