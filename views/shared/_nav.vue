<template>
  <header class="responsive max primary reverse-text">
    <nav>
      <h5 class="max"><router-link :to="{ name: 'home' }">Admin</router-link></h5>

      <button class="transparent circle"><i>confirmation_number</i></button>
      <router-link :to="{ name: 'users' }" class="transparent circle"><i>person</i></router-link>
      <button class="transparent circle"><i>shopping_cart</i></button>
      <button class="transparent circle" data-ui="#dialog-right"><i>menu</i></button>
    </nav>
  </header>

  <dialog ref="mainMenu" class="main-menu right" id="dialog-right">
    <button class="transparent circle" data-ui="#dialog-right"><i>menu</i></button>
    <ul>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">{{ $t('main_nav.dashboard') }}</router-link></li>
      <li><router-link :to="{ name: 'music' }" data-ui="#dialog-right">{{ $t('main_nav.catalog') }}</router-link></li>
      <li><router-link :to="{ name: 'clients' }" data-ui="#dialog-right">{{ $t('main_nav.clients') }}</router-link></li>
      <li><router-link :to="{ name: 'contacts' }" data-ui="#dialog-right">{{ $t('main_nav.contacts') }}</router-link>
      </li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">{{ $t('main_nav.orders') }}</router-link></li>
      <li><router-link :to="{ name: 'devices' }" data-ui="#dialog-right">{{ $t('main_nav.devices') }}</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">{{ $t('main_nav.monitoring') }}</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">{{ $t('main_nav.notifications') }}</router-link>
      </li>
      <li><router-link :to="{ name: 'playlists' }" data-ui="#dialog-right">{{ $t('main_nav.playlists') }}</router-link></li>
      <li><router-link :to="{ name: 'spots' }" data-ui="#dialog-right">{{ $t('main_nav.spots') }}</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">{{ $t('main_nav.statistics') }}</router-link></li>
      <li><router-link :to="{ name: 'users' }" data-ui="#dialog-right">{{ $t('main_nav.users') }}</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">{{ $t('main_nav.editorial') }}</router-link></li>
    </ul>
  </dialog>
</template>
