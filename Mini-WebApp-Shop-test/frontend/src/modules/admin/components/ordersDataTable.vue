<template>
  <TableWithOrdering
    :table-min-width="768"
    :column-data="columnData"
    :order-by="orderBy"
    @change-order-by="changeOrderBy"
  >
    <template v-slot:tbody>
      <tr
        v-for="row in getOrders"
        :key="row.id"
        class="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
      >
        <td class="px-2 py-1.5">
          <div class="flex items-center">
            <div class="">{{ row.id }}</div>
          </div>
        </td>
        <td class="px-2 py-1.5">
          <div class="">{{ row.user_id }}</div>
        </td>
        <td class="px-2 py-1.5">
          <div class="">{{ row.price }}</div>
        </td>
        <td class="px-2 py-1.5">
          <div class="">{{ row.sale }}</div>
        </td>
        <td class="px-2 py-1.5">
          <div class="" v-if="row.is_paid">Оплачено</div>
          <div class="" v-else>Неоплачено</div>
        </td>
        <td class="px-2 py-1.5">
          <div class="">{{ row.status }}</div>
        </td>

        <td class="px-2 py-1.5">
          <div class="flex items-center justify-end">
            <DropdownEditMenu align="right">
              <li>
                <a
                  href="#"
                  class="flex items-center rounded px-1.5 py-1 text-sm font-medium text-gray-600 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-800"
                  @click.stop="viewOrderDetails(row)"
                >
                  <n-icon size="16" style="margin-right: 6px">
                    <eye-outline />
                  </n-icon>
                  <span>Просмотреть содержимое</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center rounded px-1.5 py-1 text-sm font-medium text-gray-600 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-800"
                  @click.stop="openModalAdd(row)"
                >
                  <n-icon size="16" style="margin-right: 6px">
                    <PencilSharp />
                  </n-icon>
                  <span>Изменить</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center rounded px-1.5 py-1 text-sm font-medium text-red-500 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-red-600"
                  @click.stop="deleteRow(row)"
                >
                  <n-icon size="16" style="margin-right: 6px">
                    <trash-outline />
                  </n-icon>
                  <span>Удалить</span>
                </a>
              </li>
            </DropdownEditMenu>
          </div>
        </td>
      </tr>
      <tr v-if="!getOrders || getOrders.length === 0">
        <td colspan="3" class="p-6 text-center text-gray-500">Нет данных</td>
      </tr>
    </template>

    <template v-slot:footer>
      <div class="my-3 flex items-center justify-start gap-2 sm:auto-cols-max sm:justify-end">
        <span>Всего: {{ totalOrders }}</span>
        <Pagination v-model="pageNumber" :pages="pageCount" @update:modelValue="handlePageChange" />
      </div>
    </template>
  </TableWithOrdering>

  <ModalView
    id="modal-form-change"
    :modalOpen="addModalOpen"
    :title="'Изменить товар'"
    @open-modal="toggleModal(true)"
    @close-modal="toggleModal(false)"
  >
    <template v-slot:content>
      <OrdersFormChange
        :init-data="initData"
        @success="handleFormSuccess"
        @cancel="toggleModal(false)"
      />
    </template>
  </ModalView>

  <ModalView
    id="modal-order-details"
    :modalOpen="detailsModalOpen"
    :title="'Содержимое заказа #' + (selectedOrder?.id || '')"
    @open-modal="toggleDetailsModal(true)"
    @close-modal="toggleDetailsModal(false)"
  >
    <template v-slot:content>
      <div class="order-details">
        <div class="mb-4 rounded-md bg-gray-50 p-4">
          <div class="mb-2 text-lg font-medium">Информация о заказе</div>
          <div class="grid grid-cols-2 gap-2">
            <div class="text-sm text-gray-600">ID заказа:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.id }}</div>
            <div class="text-sm text-gray-600">ID пользователя:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.user_id }}</div>
            <div class="text-sm text-gray-600">Статус оплаты:</div>
            <div class="text-sm font-medium">
              {{ selectedOrder?.is_paid ? "Оплачено" : "Неоплачено" }}
            </div>
            <div class="text-sm text-gray-600">Статус заказа:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.status }}</div>
            <div class="text-sm text-gray-600">Цена:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.price }} ₽</div>
            <div class="text-sm text-gray-600">Скидка:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.sale }} ₽</div>
            <div class="text-sm text-gray-600">Цена со скидкой:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.price_with_sale }} ₽</div>
            <div class="text-sm text-gray-600">Адрес доставки:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.address || "Не указан" }}</div>
            <div class="text-sm text-gray-600">Телефон:</div>
            <div class="text-sm font-medium">{{ selectedOrder?.phone || "Не указан" }}</div>
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-8">
          <n-spin size="medium" />
        </div>
        <div v-else-if="orderItems.length === 0" class="py-6 text-center text-gray-500">
          В заказе нет товаров
        </div>
        <div v-else>
          <div class="mb-2 text-lg font-medium">Товары в заказе</div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    ID
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Товар
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Количество
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Цена
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Сумма
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in orderItems" :key="item.id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap px-4 py-2 text-sm">{{ item.good.id }}</td>
                  <td class="px-4 py-2 text-sm">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img
                          v-if="item.good?.url"
                          :src="item.good.url"
                          class="h-10 w-10 rounded-full object-cover"
                        />
                        <div
                          v-else
                          class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"
                        >
                          <n-icon size="20"><image-outline /></n-icon>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">
                          {{ item.good?.name || "Товар не найден" }}
                        </div>
                        <div class="text-gray-500">{{ item.good?.article || "Без артикула" }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-sm">{{ item.count }}</td>
                  <td class="whitespace-nowrap px-4 py-2 text-sm">{{ item.price }} ₽</td>
                  <td class="whitespace-nowrap px-4 py-2 text-sm font-medium">
                    {{ (item.price * item.count).toLocaleString("ru-RU") }} ₽
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-gray-50">
                  <td colspan="4" class="px-4 py-2 text-right text-sm font-medium">Итого:</td>
                  <td class="whitespace-nowrap px-4 py-2 text-sm font-medium">
                    {{ orderTotal.toLocaleString("ru-RU") }} ₽
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </template>
  </ModalView>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { NIcon, NSpin } from "naive-ui";
import { PencilSharp, TrashOutline, EyeOutline, ImageOutline } from "@vicons/ionicons5";

import { TableWithOrdering, IColumnData } from "@/modules/common/components/TableWithOrdering";
import DropdownEditMenu from "@/modules/common/components/DropdownEditMenu.vue";
import ModalView from "@/modules/common/components/ModalView.vue";
import OrdersFormChange from "./ordersFormChange.vue";
import Pagination from "@/modules/common/components/Pagination";

import { formateLocalDataTime } from "@/modules/common/utils/date-time";
import { dispatchNotification } from "@/modules/common/utils/notifications";
import {
  getURIQueryParams,
  QueryParamEnum,
  generateDataForURIQueryParams,
} from "@/modules/common/utils/__useDynamicQueryParams";

export default defineComponent({
  components: {
    TableWithOrdering,
    NIcon,
    NSpin,
    DropdownEditMenu,
    PencilSharp,
    TrashOutline,
    EyeOutline,
    ImageOutline,
    ModalView,
    OrdersFormChange,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    //
    const queryParamsConfig = {
      pageNumber: { default: 1, type: QueryParamEnum.Number },
      pageSize: { default: 20, type: QueryParamEnum.Number },
      orderBy: { default: null, type: QueryParamEnum.StringArray },
    };
    const queryParams = ref(getURIQueryParams(route.query, queryParamsConfig));
    const pageNumber = ref<number>(Number(queryParams.value.pageNumber) || 1);
    const pageSize = ref<number>(Number(queryParams.value.pageSize) || 20);
    const orderBy = ref<any>(queryParams.value.orderBy);
    //

    const pageCount = ref<number>(1);
    const columnData = ref<IColumnData[]>([
      {
        title: "ID",
        key: "id",
        isSortable: true,
      },
      {
        title: "Юзер айди",
        key: "user_id",
        isSortable: true,
      },
      {
        title: "Цена",
        key: "price",
        isSortable: true,
      },
      {
        title: "Скидка",
        key: "sale",
        isSortable: true,
      },
      {
        title: "Статус оплаты",
        key: "is_paid",
        isSortable: true,
      },
      {
        title: "Статус заказа",
        key: "status",
        isSortable: true,
      },
      {
        title: "",
        key: "salconversiones",
        isSortable: false,
      },
    ]);

    const addModalOpen = ref(false);
    const toggleModal = (status: boolean) => (addModalOpen.value = status);
    const initData = ref();

    const getOrders = computed(() => {
      const orders = store.getters["orders/GET_ALL_ORDERS"];
      return orders;
    });

    const totalOrders = computed(() => {
      const total = store.getters["orders/GET_TOTAL_ALL_ORDERS"];
      return total;
    });

    const fetchOrders = async (totalShowObjs: number, currentPage: number) => {
      try {
        const response = await store.dispatch("orders/FETCH_ALL_ORDERS", {
          pagi: {
            limit: 20,
            offset: currentPage > 0 ? currentPage - 1 : 0,
          },
          search_data: {
            is_closed: true,
          },
        });
        return response;
      } catch (error) {
        dispatchNotification(
          "error",
          "Ошибка",
          "Не удалось загрузить данные. Пожалуйста, попробуйте позже.",
          true,
          5000,
        );
      }
    };

    const deleteOrders = async (id: number) => {
      try {
        await store.dispatch("orders/DELETE_ORDERS", id);
        dispatchNotification("success", "Успешно", "пользователь успешно удален", true, 3000);
        getDataForTable(); // Обновляем данные после удаления
      } catch (error) {
        dispatchNotification(
          "error",
          "Ошибка",
          "Не удалось удалить пользователя. Пожалуйста, попробуйте позже.",
          true,
          5000,
        );
      }
    };

    const timerForDataTebleSearch = ref<any>(null);
    const getDataForTable = async () => {
      clearTimeout(timerForDataTebleSearch.value);
      timerForDataTebleSearch.value = setTimeout(async () => {
        const currentPageSize = Math.max(Number(pageSize.value) || 20, 1);
        const currentPage = Math.max(Number(pageNumber.value) || 1, 1);

        await fetchOrders(currentPageSize, currentPage).then(() => {
          const total = Number(totalOrders.value) || 0;
          if (total > 0) {
            pageCount.value = Math.max(Math.ceil(total / currentPageSize), 1);
          } else {
            pageCount.value = 1;
          }
        });
      }, 500);
    };

    onMounted(() => {
      const params = getURIQueryParams(route.query, queryParamsConfig);
      pageNumber.value = Math.max(Number(params.pageNumber) || 1, 1);
      pageSize.value = Math.max(Number(params.pageSize) || 20, 1);
      orderBy.value = params.orderBy;
      getDataForTable();
    });

    const openModalAdd = (row: any) => {
      initData.value = {
        id: row.id,
        price: row.price,
        sale: row.sale,
        is_paid: row.is_paid,
        status: row.status,
      };
      addModalOpen.value = true;
    };
    const deleteRow = async (row: any) => {
      await deleteOrders(row.id);
    };
    watch(pageCount, (currentValue: any, oldValue: any) => {
      if (currentValue < 1) {
        pageCount.value = 1;
        pageNumber.value = 1;
      }
    });

    watch(
      () => route.query,
      (currentValue: any, oldValue: any) => {
        const params = getURIQueryParams(route.query, queryParamsConfig);
        pageNumber.value = Math.max(Number(params.pageNumber) || 1, 1);
        pageSize.value = Math.max(Number(params.pageSize) || 20, 1);
        orderBy.value = params.orderBy;
        getDataForTable();
      },
    );

    const changeOrderBy = (data: string[] | null) => {
      orderBy.value = data;
      router.push({
        query: generateDataForURIQueryParams({ ...route.query, orderBy: data, pageNumber: 1 }),
      });
    };

    const handlePageChange = async (currentPage: number) => {
      pageNumber.value = currentPage;
      const qp = {
        ...queryParams.value,
        pageNumber: pageNumber.value,
      };
      router.push({ query: generateDataForURIQueryParams({ ...route.query, ...qp }) });
    };

    const handleFormSuccess = () => {
      toggleModal(false);
      getDataForTable();
    };

    // Модальное окно для отображения содержимого заказа
    const detailsModalOpen = ref(false);
    const toggleDetailsModal = (status: boolean) => (detailsModalOpen.value = status);
    const selectedOrder = ref(null);
    const orderItems = ref([]);
    const loading = ref(false);

    // Вычисляем общую сумму товаров в заказе
    const orderTotal = computed(() => {
      return orderItems.value.reduce((total, item) => total + item.price * item.count, 0);
    });

    // Функция для просмотра содержимого заказа
    const viewOrderDetails = async (order) => {
      selectedOrder.value = order;
      toggleDetailsModal(true);
      loading.value = true;

      try {
        // Получаем детальную информацию о заказе если нужно
        await store.dispatch("orders/FETCH_DETAIL_GOOD", order.id);
        const orderDetail = store.getters["orders/GET_DETAIL_GOOD"];

        // Если в заказе уже есть список товаров, используем его
        if (orderDetail && orderDetail.goods) {
          orderItems.value = orderDetail.goods;
        } else {
          // Иначе запрашиваем список товаров по ID заказа
          await store.dispatch("orderGoods/FETCH_ALL_ORDERGOODS", {
            search_data: {
              order_id: order.id,
            },
          });

          const items = store.getters["orderGoods/GET_ALL_ORDERGOODS"];

          // Получаем информацию о каждом товаре
          const itemsWithGoods = [...items];
          for (const item of itemsWithGoods) {
            if (!item.good && item.good_id) {
              try {
                await store.dispatch("goods/FETCH_DETAIL_GOOD", item.good_id);
                const good = store.getters["goods/GET_DETAIL_GOOD"];
                if (good) {
                  item.good = good;
                }
              } catch (error) {
                console.error(`Error fetching details for product ${item.good_id}:`, error);
              }
            }
          }

          orderItems.value = itemsWithGoods;
        }
      } catch (error) {
        console.error("Error loading order details:", error);
        dispatchNotification(
          "error",
          "Ошибка",
          "Не удалось загрузить содержимое заказа. Пожалуйста, попробуйте позже.",
          true,
          5000,
        );
        orderItems.value = [];
      } finally {
        loading.value = false;
      }
    };

    return {
      formateLocalDataTime,
      getOrders,
      addModalOpen,
      toggleModal,
      initData,
      openModalAdd,
      deleteRow,
      totalOrders,
      pageCount,
      handlePageChange,
      handleFormSuccess,
      columnData,
      orderBy,
      changeOrderBy,
      pageNumber,
      detailsModalOpen,
      toggleDetailsModal,
      selectedOrder,
      orderItems,
      orderTotal,
      viewOrderDetails,
      loading,
    };
  },
});
</script>

<style scoped></style>
