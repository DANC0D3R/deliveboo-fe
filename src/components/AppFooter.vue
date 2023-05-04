<script>

export default {
  name: "AppFooter",
  data() {
    return {
      services: [
        {
          link: '#',
          label: 'Domande frequenti'
        },
        {
          link: '#',
          label: 'Accedi'
        },
        {
          link: '#',
          label: 'Registrati sub Deliveboo'
        },
        {
          link: '#',
          label: 'Miglior Prezzo'
        },
        {
          link: '#',
          label: 'Scaripa l\'app Deliveboo'
        },

      ],

      about: [
        {
          link: '#',
          label: 'Informazioni su Deliveboo'
        },
        {
          link: '#',
          label: 'Diventa partner Deliveboo'
        },
        {
          link: '#',
          label: 'Diventa un rider'
        },
        {
          link: '#',
          label: 'Lavora con noi'
        },
        {
          link: '#',
          label: 'Informativa sulla privacy'
        },
        {
          link: '#',
          label: 'Politica dei cookie'
        },
        {
          link: '#',
          label: 'Termini e condizioni'
        },
        {
          link: '#',
          label: 'Codice Etico'
        },
        {
          link: '#',
          label: 'Informazioni legali'
        },
        {
          link: '#',
          label: 'Sostenibilità'
        },
        {
          link: '#',
          label: 'Partner Center'
        },
      ],

      cities: [
        {
          link: '#',
          label: 'Roma'
        },
        {
          link: '#',
          label: 'Milano'
        },
        {
          link: '#',
          label: 'Bologna'
        },
        {
          link: '#',
          label: 'Firenze'
        },
        {
          link: '#',
          label: 'Napoli'
        },
        {
          link: '#',
          label: 'Pisa'
        },
        {
          link: '#',
          label: 'Torino'
        },
        {
          link: '#',
          label: 'Ferrara'
        },
        {
          link: '#',
          label: 'Palermo'
        },
        {
          link: '#',
          label: 'Padova'
        },
        {
          link: '#',
          label: 'Genova'
        },
      ]
    }
  },
  components: {
  },
  methods: {

  }
};
</script>

<template>
  <footer class="mt-5">

    <div class="gray-background py-5">
      <div class="container footer-container">

        <!-- Prima Row con SOCIAL -->
        <div class="row">

          <!-- Servizio clienti -->
          <div class="col-lg-2 col-sm-4">
            <ul>
              <h5>Servizio Clienti</h5>
              <li v-for="service in services">
                <a :href="service.link">
                  {{ service.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- About us -->
          <div class="col-lg-2 col-sm-4">
            <ul>
              <h5>Chi Siamo</h5>
              <li v-for="us in about">
                <a :href="us.link">
                  {{ us.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Città -->
          <div class="col-lg-2 col-sm-4">
            <ul>
              <h5>Città</h5>
              <li v-for="city in cities">
                <a :href="city.link">
                  {{ city.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Seguici -->
          <div class="follow-us col-lg-6 col-sm-12 d-flex align-items-center justify-content-center">
            <div>
              <h2 class="text-center">
                Il bello è prenderci gusto
              </h2>

              <h5 class="text-center mb-3">
                Seguici sui nostri canali social per rimanere sempre aggiornato
              </h5>

              <div class=" d-flex align-items-center justify-content-center">
                <div class="social">
                  <a href="#">
                    <i class="fa-brands fa-square-facebook"></i>
                    <span>Facebook</span>
                  </a>
                </div>

                <div class="social">
                  <a href="#">
                    <i class="fa-brands fa-square-instagram"></i>
                    <span>Instragram</span>
                  </a>
                </div>

                <div class="social">
                  <a href="#">
                    <i class="fa-brands fa-square-twitter"></i>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="white-background py-4">
      <div class="container">

        <!-- Seconda Row con Info e Pagamenti -->
        <div class="row align-items-center">

          <div class="col-6">
            <span>Deliveboo Italia S.r.l. - P.IVA 77592750960</span>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <img src="../img/mastercard-logo.png" alt="mastercard-logo">
            <img src="../img/visa-logo.png" alt="visa-logo">
            <img src="../img/paypal-logo.png" alt="paypal-logo">
          </div>

        </div>

      </div>
    </div>

    <div class="gray-background text-center py-3">
      <a href="#" class="cookie">Controlla le mie preferenze sui cookie</a>
    </div>

  </footer>
</template>

<style lang="scss">
.gray-background {
  background-color: #EFEDEA;

  div {
    ul {
      h5 {
        margin-bottom: 1rem;
        font-weight: 600;
      }

      li {
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        font-weight: 300;
        list-style-type: none;
      }
    }
  }

  .social>a {
    background-color: black;
    color: white !important;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 0 1rem;

    i {
      margin-right: 0.3rem;
    }

  }

  .payment-info {
    background-color: white;

  }

  .cookie {
    font-size: 0.7rem;
    font-weight: 600;
    text-decoration: underline;
  }
}

.white-background {
  background-color: white;

  img {
    height: 1.5rem;
    margin-left: 0.8rem;
  }
}

@media screen and (max-width: 990px) {
  .follow-us {
    padding-top: 30px;
  }
}

@media screen and (max-width: 575px) {
  .footer-container {
    text-align: center;
  }
}
</style>
