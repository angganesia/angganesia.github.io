---
layout: post
title: Tutorial Smart AutoClicker
date: 2024-06-06
categories: ["Tutorial"]
---

#### Source

![Smart AutoClicker](https://raw.githubusercontent.com/Nain57/Smart-AutoClicker/master/smartautoclicker/src/main/ic_smart_auto_clicker-playstore.png)

[Smart AutoClicker](https://github.com/Nain57/Smart-AutoClicker?tab=readme-ov-file) adalah aplikasi Android OpenSource yang di gunakan untuk melakukan tugas secara otomatis, kalian bisa mendownload dan membaca dokumentasinya [disini](https://github.com/Nain57/Smart-AutoClicker?tab=readme-ov-file)

#### Scenarios

![Scenarios](/assets/img/Smart AutoClicker/Screenshot_20240606-104522.png)

Ditampilan awal ini kita bisa membuat, menghapus, import, dan export project.

#### Events

![Events](/assets/img/Smart AutoClicker/20240606_103531.jpg)

Ditab Events ini kita bisa melihat daftar list perintah yang akan menentukan setiap kondisi perintah kita.

##### Events - Setting

![EventsSettings](/assets/img/Smart AutoClicker/20240606_103604.jpg)

Ditab EventsSettings kita bisa melihat name, conditions, state.

> Name : memberi nama pada events
> Conditions : events akan berjalan terus menerus jika status **All** dan berjalan sekali jika status **One**
> State : events akan aktif jika status **Enable** dan mati jika **Disable**

##### Events - Conditions

![EventsConditions](/assets/img/Smart AutoClicker/20240606_103638.jpg)

Ditab EventsConditions berisi gambar dari kondisi yang akan kita lakukan.

> Gambar dari kondisi akan dicari true/false sebelum melakukan actions.

##### Events - Actions

![EventsActions](/assets/img/Smart AutoClicker/20240606_103702.jpg)

Ditab EventsActions berisi perintah yang akan kita lakukan.

> Click : melakukan perintah klik tergantung berapa lama kita menentukan _press duration_, semakin lama _press duration_ semakin lama pula durasi kliknya.
> Swipe : melakukan perintah swipe
> Wait : memberi jeda waktu tunggu.
> Intent : membuka aplikasi lain.
> Change event state : merubah status state pada event tertentu menjadi enable atau disable.