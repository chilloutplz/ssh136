<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
    >
      <div class="custom-calendar">
        <FullCalendar class="min-h-screen" :options="calendarOptions" />
      </div>

      <Modal v-if="isOpen" @close="closeModal">
          <div
            class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
          >
            <h5
              class="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90 lg:text-2xl"
            >
              {{ selectedEvent ? 'Edit Event' : 'Add Event' }}
            </h5>

            <p class="text-sm text-gray-500 dark:text-gray-400">
              Plan your next big moment: schedule or edit an event to stay on track
            </p>

            <div class="mt-8 space-y-6">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Title
                </label>
                <input
                  v-model="eventTitle"
                  type="text"
                  class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label class="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Event Color
                </label>

                <div class="flex flex-wrap items-center gap-4 sm:gap-5">
                  <div v-for="(_, key) in calendarsEvents" :key="key">
                    <label
                      :for="`modal-${key}`"
                      class="flex cursor-pointer items-center text-sm text-gray-700 dark:text-gray-400"
                    >
                      <input
                        :id="`modal-${key}`"
                        v-model="eventLevel"
                        type="radio"
                        name="event-level"
                        :value="key"
                        class="mr-2"
                      />
                      {{ key }}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter Start Date
                </label>
                <input
                  v-model="eventStartDate"
                  type="date"
                  class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Enter End Date
                </label>
                <input
                  v-model="eventEndDate"
                  type="date"
                  class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
            </div>

            <div class="mt-6 flex items-center gap-3 sm:justify-end">
              <button
                type="button"
                @click="closeModal"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto"
              >
                Close
              </button>

              <button
                type="button"
                @click="handleAddOrUpdateEvent"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                {{ selectedEvent ? 'Update Changes' : 'Add Event' }}
              </button>

              <button
                v-if="selectedEvent"
                type="button"
                @click="handleDeleteEvent"
                class="flex w-full justify-center rounded-lg border border-error-500 bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto"
              >
                Delete Event
              </button>
            </div>
          </div>
      </Modal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core'
import type { EventApi } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import Modal from '@/components/profile/Modal.vue'

const currentPageTitle = ref('Calendar')

const isOpen = ref(false)
const selectedEvent = ref<EventApi | null>(null)

const eventTitle = ref('')
const eventStartDate = ref('')
const eventEndDate = ref('')
const eventLevel = ref('Danger')

const calendarsEvents = reactive({
  Danger: 'danger',
  Success: 'success',
  Primary: 'primary',
  Warning: 'warning',
})

const events = ref<EventInput[]>([
  {
    id: '1',
    title: 'Event Conf.',
    start: new Date().toISOString().split('T')[0],
    extendedProps: {
      calendar: 'Danger',
    },
  },
  {
    id: '2',
    title: 'Meeting',
    start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    extendedProps: {
      calendar: 'Success',
    },
  },
  {
    id: '3',
    title: 'Workshop',
    start: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    end: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    extendedProps: {
      calendar: 'Primary',
    },
  },
])

const resetModalFields = () => {
  eventTitle.value = ''
  eventStartDate.value = ''
  eventEndDate.value = ''
  eventLevel.value = 'Danger'
  selectedEvent.value = null
}

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  resetModalFields()
}

const handleDateSelect = (selectInfo: DateSelectArg) => {
  resetModalFields()

  eventStartDate.value = selectInfo.startStr
  eventEndDate.value = selectInfo.endStr || selectInfo.startStr

  openModal()
}

const handleEventClick = (clickInfo: EventClickArg) => {
  const event = clickInfo.event

  selectedEvent.value = event
  eventTitle.value = event.title
  eventStartDate.value = event.startStr
  eventEndDate.value = event.endStr || event.startStr
  eventLevel.value = (event.extendedProps.calendar as string) || 'Danger'

  openModal()
}

const handleAddOrUpdateEvent = () => {
  if (!eventTitle.value || !eventStartDate.value) {
    return
  }

  if (selectedEvent.value) {
    events.value = events.value.map((event) => {
      if (event.id === selectedEvent.value?.id) {
        return {
          ...event,
          title: eventTitle.value,
          start: eventStartDate.value,
          end: eventEndDate.value,
          extendedProps: {
            calendar: eventLevel.value,
          },
        }
      }

      return event
    })
  } else {
    events.value.push({
      id: Date.now().toString(),
      title: eventTitle.value,
      start: eventStartDate.value,
      end: eventEndDate.value,
      allDay: true,
      extendedProps: {
        calendar: eventLevel.value,
      },
    })
  }

  closeModal()
}

const handleDeleteEvent = () => {
  if (!selectedEvent.value) {
    return
  }

  events.value = events.value.filter((event) => event.id !== selectedEvent.value?.id)

  closeModal()
}

const renderEventContent = (eventInfo: {
  event: EventApi
  timeText: string
}) => {
  const calendar = (eventInfo.event.extendedProps.calendar as string)?.toLowerCase() || 'primary'

  return {
    html: `
      <div class="fc-bg-${calendar} flex rounded-sm p-1 text-white">
        <div class="fc-event-time mr-1">${eventInfo.timeText}</div>
        <div class="fc-event-title">${eventInfo.event.title}</div>
      </div>
    `,
  }
}

const calendarOptions = reactive<CalendarOptions>({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  selectable: true,
  events: events.value,

  headerToolbar: {
    left: 'prev,next addEventButton',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },

  select: handleDateSelect,
  eventClick: handleEventClick,
  eventContent: renderEventContent,

  customButtons: {
    addEventButton: {
      text: 'Add Event +',
      click: () => {
        resetModalFields()
        openModal()
      },
    },
  },
})
</script>
