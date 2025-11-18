const uniqueUrls = (urls = []) => [...new Set(urls.filter(Boolean))]

const assignSubcategories = (urls = [], subcategories = []) => {
  const effectiveSubcategories =
    subcategories.length > 0
      ? subcategories
      : [
          {
            name: 'Serie destacada'
          }
        ]

  return uniqueUrls(urls).map((url, index) => {
    const rawEntry = effectiveSubcategories[index % effectiveSubcategories.length]
    const normalizedEntry =
      typeof rawEntry === 'string' ? { name: rawEntry } : rawEntry || { name: 'Serie destacada' }

    const { name = 'Serie destacada', para } = normalizedEntry

    const meta = {}
    if (para) {
      meta.para = para
    }

    return {
      url,
      subcategory: name,
      meta: Object.keys(meta).length > 0 ? meta : undefined
    }
  })
}

const royRiffImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041829/IMG_9946_kczqsj.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041825/DSC07964_wpdvar.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041824/DSC07842_lc3z4x.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041824/DSC07724_awdcph.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041823/DSC07634_2_o19n1t.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041823/DSC07596_nj36qw.webp'
]

const tredPuntoComImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040310/DSC03324_lezasd.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040310/DSC03419_qklb7r.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040310/DSC03403_y6x4ul.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040310/DSC03391_nw8msx.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040309/DSC03364_be8rhk.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040309/DSC03368_d5dn7i.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040309/DSC03348_v34ufw.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040307/DSC03453_scmkpl.webp'
]

const ondaMilongaImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040307/DSC02259_bzojhn.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040309/DSC03549_begzar.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040308/DSC03605_iglo2d.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040308/DSC03558_ywaqzk.webp'
]

const viajesImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763387757/IMG_3193_uxnmqa.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763387756/IMG_7348_3_s9jcnv.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763387755/DSC02759_pzwvyv.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763387755/DSC02758_2_xeclru.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763387754/IMG_6793_3_nelbzf.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763387754/DSC02730_pvmk1d.webp'
]

const paltasDelTimboImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041821/DSC01203_2_flce30.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041821/DSC01133_2_zvsukp.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041821/DSC01121_2_xb1e0b.webp'
]

const comidaPregoImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040030/DSC01570_zvvl2s.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040030/DSC01516_2_ohepkn.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040030/DSC01731_daouhp.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040031/DSC01782_slcmt5.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040032/DSC01975_zgkzxy.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040032/DSC02021_2_mos0ss.webp'
]

const comidaKasaNorteImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040039/DSC08518_xmqrgh.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040038/DSC08507_k0vxoq.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040038/DSC08385_aorpbh.webp'
]

const comidaLaCaballerizaImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040035/DSC03300_wugpnm.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040038/DSC03289_vo4dy1.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040033/DSC03284_zpskzo.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040032/DSC03245_pxjzkk.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040032/DSC03217_upkiw9.webp'
]

const comidaDeiFioriImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040037/DSC05199_yzhyby.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040036/DSC05161_xsikgy.webp'
]

const luisJapazeImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041531/DSC00252_naos4i.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041530/DSC00040_wg3by0.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041528/DSC09713_xqkncq.webp'
]

const fabulaRasaImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041511/DSC00004_ynieaw.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041526/IMG_1555_kwunm4.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041528/IMG_1557_mtyase.webp'
]

const weissImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041518/DSC04303_j6btc4.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041516/DSC04189_wtjcbz.webp'
]

const casamientoPauNachoImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041523/DSC08362_j2urvy.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041522/DSC08354_zlwxe7.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041522/DSC08300_rjn476.webp',
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041520/DSC08103_tju1ic.webp'
]

const comunionClaraImages = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763041519/DSC05547_eiutfj.webp'
]

export const gallery = {
  ArqDiseño: [
    ...assignSubcategories(tredPuntoComImages, [{ name: 'Tred', para: 'Estudio Punto Com' }]),
    ...assignSubcategories(ondaMilongaImages, ['Onda y Milonga'])
  ],

  Comida: [
    ...assignSubcategories(comidaPregoImages, ['Prego']),
    ...assignSubcategories(comidaKasaNorteImages, ['Kasa Norte']),
    ...assignSubcategories(comidaLaCaballerizaImages, [
      { name: 'La Caballeriza', para: 'Estudio Punto Com' }
    ]),
    ...assignSubcategories(comidaDeiFioriImages, [{ name: 'Dei Fiori', para: 'Estudio Punto Com' }])
  ],

  Deportes: assignSubcategories(
    [
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040833/IMG_6022_2_yoczah.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040832/IMG_6025_gsw1gg.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040832/IMG_6008_ucgqk1.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040832/IMG_6012_skmauf.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040832/IMG_5995_tpgcyj.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040831/IMG_5962_wdc6hm.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040831/IMG_5948_c9wkif.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763040831/IMG_5947_moefzz.webp'
    ],
    ['La Academia']
  ),

  Eventos: [
    ...assignSubcategories(luisJapazeImages, ['Luis Japaze']),
    ...assignSubcategories(fabulaRasaImages, ['Fabula Rasa']),
    ...assignSubcategories(weissImages, ['Weiss']),
    ...assignSubcategories(casamientoPauNachoImages, ['Casamiento Pau & Nacho']),
    ...assignSubcategories(comunionClaraImages, ['Comunion Clara'])
  ],

  Indumentaria: assignSubcategories(
    [
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039873/DSC09520_xfdtrq.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039863/DSC09369_w6ddi9.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039862/DSC09390_cdatd1.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039862/DSC09526_tzz1cr.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039862/DSC09495_g4gxqy.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039860/DSC09383_rlfrxv.webp',
      'https://res.cloudinary.com/dum0alaoe/image/upload/v1763039860/DSC09395_vivr0d.webp'
    ],
    ['Kids Land']
  ),

  Viajes: assignSubcategories(viajesImages, ['Viajes']),

  Otros: [
    ...assignSubcategories(royRiffImages, ['Roy Riff']),
    ...assignSubcategories(paltasDelTimboImages, ['Paltas del Timbó'])
  ]
}
