// src/router/modules/accounting.ts
import AccountingList from '@/views/accounting/AccountingList.vue'
import JournalForm from '@/views/accounting/JournalForm.vue'
import JournalDetail from '@/views/accounting/JournalDetail.vue'
import JournalEdit from '@/views/accounting/JournalEdit.vue'

export default [
  { path: '/accounting', name: 'AccountingList', component: AccountingList, meta: { title: '전표 목록' } },
  { path: '/accounting/new', name: 'JournalCreate', component: JournalForm, meta: { title: '전표 등록' } },
  { path: '/accounting/:id', name: 'JournalDetail', component: JournalDetail, meta: { title: '전표 상세' }, props: true },
  { path: '/accounting/:id/edit', name: 'JournalEdit', component: JournalEdit, meta: { title: '전표 수정' }, props: true },
]
