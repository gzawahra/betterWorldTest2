/* eslint-disable camelcase */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

function lazyLoad (view: string) {
  return () => import(`../views/${view}.vue`)
}

const routes: Array< RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: lazyLoad('HomeView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
