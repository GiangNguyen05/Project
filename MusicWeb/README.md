# 🎵 Musicforme — Tài Liệu Dự Án

---

## Mục Lục

1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Công Nghệ Sử Dụng](#2-công-nghệ-sử-dụng)
3. [Cấu Trúc Thư Mục](#3-cấu-trúc-thư-mục)
4. [Các Thành Phần (Components)](#4-các-thành-phần-components)
5. [Custom Hooks](#5-custom-hooks)
6. [Dữ Liệu & Constants](#6-dữ-liệu--constants)
7. [Các Section Trên Trang](#7-các-section-trên-trang)
8. [Responsive Design](#8-responsive-design)
9. [Hướng Dẫn Cài Đặt & Chạy](#9-hướng-dẫn-cài-đặt--chạy)
10. [Hướng Phát Triển Tiếp Theo](#10-hướng-phát-triển-tiếp-theo)

---

## 1. Tổng Quan Dự Án

**Musicforme** là một landing page âm nhạc hiện đại được xây dựng bằng React. Giao diện hướng đến phong cách **Vibrant & Bold** với nền đen, màu accent Cyan `#00F5FF`, kết hợp typography mạnh mẽ từ bộ font _Space Grotesk_ và _DM Sans_.

### Mục tiêu thiết kế

- Trải nghiệm người dùng mượt mà, nhanh, không phụ thuộc thư viện ngoài nặng nề
- Giao diện đáp ứng tốt trên mọi thiết bị: điện thoại, máy tính bảng, desktop
- Màu sắc nổi bật, hiện đại, phù hợp thị hiếu người dùng trẻ Việt Nam

### Tính năng chính

| Tính năng         | Mô tả                                      |
| ----------------- | ------------------------------------------ |
| Mini Player       | Thanh phát nhạc cố định phía dưới màn hình |
| Bảng xếp hạng     | Top 6 bài hát hot nhất tuần                |
| Playlist nổi bật  | Grid 4 playlist được đề xuất               |
| Nghệ sĩ nổi bật   | 5 nghệ sĩ phổ biến nhất                    |
| Navbar responsive | Menu hamburger trên mobile                 |
| Seek & Progress   | Click vào thanh tiến trình để tua nhạc     |

---

## 2. Công Nghệ Sử Dụng

### Frontend Core

| Công nghệ                     | Phiên bản | Mục đích                               |
| ----------------------------- | --------- | -------------------------------------- |
| **React**                     | 18+       | UI framework chính                     |
| **JSX**                       | —         | Cú pháp component                      |
| **CSS-in-JS** (inline styles) | —         | Styling linh hoạt, scoped              |
| **CSS Keyframes**             | —         | Animation: wave, float, shimmer, pulse |

### Fonts & Icons

| Tài nguyên    | Nguồn        | Mục đích                          |
| ------------- | ------------ | --------------------------------- |
| Space Grotesk | Google Fonts | Heading, logo, số liệu thống kê   |
| DM Sans       | Google Fonts | Body text, UI text                |
| SVG inline    | Custom       | Icons (play, pause, skip, volume) |

### Không sử dụng thư viện ngoài

Dự án **không** phụ thuộc vào:

- ❌ Tailwind CSS (tránh overhead compiler)
- ❌ styled-components / emotion
- ❌ React Router (single page)
- ❌ Redux / Zustand (state đơn giản, dùng hooks thuần)
- ❌ Axios (chưa cần API call)

---

## 3. Cấu Trúc Thư Mục

```
musicforme/
└── src/
    ├── constants/
    │   ├── data.js          # Dữ liệu mock: bài hát, nghệ sĩ, playlist
    │   └── theme.js         # Màu sắc, gradient, breakpoint
    │
    ├── hooks/
    │   ├── usePlayer.js     # Logic phát nhạc: play/pause/seek/progress
    │   ├── useResponsive.js # Theo dõi kích thước màn hình
    │   └── useScrolled.js   # Phát hiện scroll để đổi style navbar
    │
    ├── styles/
    │   └── global.css       # Reset CSS, keyframe animation, utility class
    │
    ├── components/
    │   ├── UI.jsx           # Atoms tái sử dụng: Button, Logo, Waveform...
    │   ├── Navbar.jsx       # Thanh điều hướng + mobile drawer
    │   ├── HeroSection.jsx  # Phần hero chính + player card
    │   ├── TopCharts.jsx    # Bảng xếp hạng bài hát
    │   ├── PlaylistSection.jsx  # Grid playlist
    │   ├── ArtistSection.jsx    # Grid nghệ sĩ
    │   ├── CTABanner.jsx    # Banner kêu gọi hành động + footer
    │   └── MiniPlayer.jsx   # Thanh phát nhạc cố định đáy trang
    │
    └── App.jsx              # Component gốc, kết hợp tất cả section
```

---

## 4. Các Thành Phần (Components)

### 4.1 `UI.jsx` — Atomic Components

File chứa các thành phần UI nhỏ nhất, dùng lại ở nhiều nơi.

#### `<Logo />`

- Hiển thị logo thương hiệu _Musicforme_ gồm icon SVG + tên
- Prop `size`: `"sm"` hoặc `"md"` để điều chỉnh kích thước
- Có animation `pulse-glow` nhấp nháy liên tục

#### `<Waveform active />`

- 5 thanh sóng âm động, dùng để chỉ bài đang phát trong bảng xếp hạng
- Khi `active=true`: các thanh nhảy lên xuống theo animation `wave`
- Khi `active=false`: các thanh đứng yên, màu tối

#### `<BtnPrimary />` và `<BtnGhost />`

- `BtnPrimary`: nút gradient Cyan → Blue, có glow shadow
- `BtnGhost`: nút viền trắng mờ, nền trong suốt
- Cả hai nhận prop `onClick` và `style` để tuỳ biến

#### `<SectionHeader tag title onMore />`

- Dùng thống nhất cho tiêu đề các section
- Gồm: tag nhỏ (emoji + nhãn), tiêu đề lớn, link "Xem tất cả →"

---

### 4.2 `Navbar.jsx`

Thanh điều hướng cố định phía trên trang.

**Chức năng:**

- Trong suốt khi ở đầu trang, đặc + blur khi scroll xuống (dùng `useScrolled`)
- Desktop: hiển thị 4 link điều hướng + nút CTA
- Mobile: ẩn link, hiện icon hamburger 3 gạch
- Khi bấm hamburger: mở drawer menu từ trên xuống với animation transform
- Active link được highlight màu Cyan

**Props:** `activeNav` (string), `onNav` (function)

---

### 4.3 `HeroSection.jsx`

Section đầu tiên và lớn nhất, chiếm toàn bộ chiều cao màn hình.

**Chức năng:**

- Bên trái: headline shimmer animation, mô tả, 2 nút CTA, 3 số liệu thống kê
- Bên phải: card player mini tích hợp — hiển thị bài đang phát, thanh tiến trình có thể click để seek, danh sách 2 bài tiếp theo
- 2 quả cầu phát sáng (orb) chuyển động nổi trong nền
- Layout đổi từ 2 cột (desktop) sang 1 cột dọc (mobile/tablet)

**Props:** `player` — object từ `usePlayer`

---

### 4.4 `TopCharts.jsx`

Bảng xếp hạng 6 bài hát hot nhất.

**Chức năng:**

- Grid 2 cột (desktop) / 1 cột (mobile)
- Số thứ tự 1–3 highlight màu Cyan, 4–6 màu tối
- Bài đang phát có viền Cyan + hiển thị `<Waveform>` thay cho thời lượng
- Hover: nền nhạt Cyan + icon play hiện trên ảnh bìa
- Click vào bài → phát bài đó ngay lập tức

**Props:** `player`

---

### 4.5 `PlaylistSection.jsx`

Grid 4 playlist được gợi ý.

**Chức năng:**

- 4 cột desktop → 3 cột tablet → 2 cột mobile
- Hover card: nâng lên + glow shadow
- Hover ảnh: overlay tối + nút play tròn xuất hiện

---

### 4.6 `ArtistSection.jsx`

Grid 5 nghệ sĩ nổi bật.

**Chức năng:**

- 5 cột desktop → 3 cột tablet → 2 cột mobile (hiển thị 4 nghệ sĩ)
- Avatar tròn có viền Cyan mờ + vòng ngoài trang trí
- Badge tag thể loại nhạc (V-Pop, Ballad, Hip-hop...)
- Hover: nâng lên + glow

---

### 4.7 `CTABanner.jsx` & `<Footer />`

**CTABanner:**

- Banner gradient kêu gọi đăng ký dùng thử Premium
- Layout ngang (desktop) → dọc (mobile)
- Orb trang trí góc phải

**Footer:**

- Logo nhỏ, dòng copyright
- Đơn giản, không làm phân tâm

---

### 4.8 `MiniPlayer.jsx`

Thanh phát nhạc cố định ở đáy trang, luôn hiển thị.

**Chức năng:**

| Thành phần                   | Mô tả                                         |
| ---------------------------- | --------------------------------------------- |
| Ảnh bìa + tên bài            | Hiển thị bài đang chọn                        |
| Nút Prev / Play-Pause / Next | Điều khiển phát nhạc                          |
| Thanh tiến trình             | Có thể click để seek đến vị trí bất kỳ        |
| Nhãn thời gian               | Hiển thị elapsed / total (tính từ progress %) |
| Thanh âm lượng               | Hiển thị tĩnh (desktop only)                  |

**Responsive:**

- Desktop: hiển thị đủ — cover, controls, progress, volume
- Mobile: ẩn nút skip và thanh volume, tối giản hoá

---

## 5. Custom Hooks

### `usePlayer()`

Hook trung tâm quản lý toàn bộ trạng thái phát nhạc.

```js
const { currentSong, playing, progress, play, toggle, seekFromEvent } =
  usePlayer();
```

| Giá trị / Hàm      | Kiểu           | Mô tả                                           |
| ------------------ | -------------- | ----------------------------------------------- |
| `currentSong`      | object         | Bài hát đang được chọn                          |
| `playing`          | boolean        | Đang phát hay tạm dừng                          |
| `progress`         | number (0–100) | Phần trăm tiến trình bài hát                    |
| `play(song)`       | function       | Phát một bài hát cụ thể                         |
| `toggle()`         | function       | Chuyển đổi play ↔ pause                         |
| `seekFromEvent(e)` | function       | Tính toán seek từ click event trên progress bar |

**Logic giả lập phát nhạc:** Dùng `setInterval` để tăng `progress` 0.2% mỗi 100ms khi đang phát. Khi `progress` đạt 100, tự động dừng.

---

### `useResponsive()`

Hook theo dõi kích thước cửa sổ trình duyệt theo thời gian thực.

```js
const { isMobile, isTablet, isDesktop, width } = useResponsive();
```

| Biến        | Điều kiện                |
| ----------- | ------------------------ |
| `isMobile`  | `width < 768px`          |
| `isTablet`  | `768px ≤ width < 1024px` |
| `isDesktop` | `width ≥ 1024px`         |

Dùng debounce 80ms để tránh re-render quá nhiều khi resize.

---

### `useScrolled(threshold)`

Hook trả về `true` khi trang đã scroll quá ngưỡng `threshold` pixel (mặc định 60px).

```js
const scrolled = useScrolled(60);
```

Dùng trong `Navbar` để chuyển từ nền trong suốt sang nền đặc + blur.

---

## 6. Dữ Liệu & Constants

### `constants/data.js`

Chứa toàn bộ dữ liệu mock tĩnh của ứng dụng:

- **`SONGS`** — mảng 6 bài hát, mỗi bài gồm: `id`, `title`, `artist`, `duration`, `plays`, `cover`
- **`ARTISTS`** — mảng 5 nghệ sĩ gồm: `id`, `name`, `genre`, `followers`, `img`
- **`PLAYLISTS`** — mảng 4 playlist gồm: `id`, `name`, `count`, `img`
- **`NAV_LINKS`** — mảng các link điều hướng `{ label, key }`
- **`STATS`** — mảng 3 số liệu hero `{ num, label }`

### `constants/theme.js`

Chứa các hằng số thiết kế:

```js
COLORS = {
  cyan:       "#00F5FF",   // màu accent chính
  blue:       "#0060FF",   // màu accent phụ
  bg:         "#080808",   // nền trang
  textMuted:  "#888888",   // text phụ
  ...
}

GRADIENTS = {
  cyan:  "linear-gradient(135deg,#00F5FF,#0060ff)",
  hero:  "radial-gradient(...)",
  ...
}

BP = {
  md: 768,   // mobile breakpoint
  lg: 1024,  // tablet breakpoint
  xl: 1200,  // max content width
}
```

---

## 7. Các Section Trên Trang

Thứ tự render từ trên xuống dưới trong `App.jsx`:

```
┌─────────────────────────────────────┐
│  Navbar  (fixed top, z-index: 50)   │
├─────────────────────────────────────┤
│  HeroSection  (100vh)               │
│    • Headline + CTA buttons         │
│    • Player card                    │
├─────────────────────────────────────┤
│  TopCharts                          │
│    • 6 bài xếp hạng (2 cột)        │
├─────────────────────────────────────┤
│  PlaylistSection                    │
│    • 4 playlist (4 cột)            │
├─────────────────────────────────────┤
│  ArtistSection                      │
│    • 5 nghệ sĩ (5 cột)             │
├─────────────────────────────────────┤
│  CTABanner                          │
│  Footer                             │
├─────────────────────────────────────┤
│  MiniPlayer  (fixed bottom, z:100)  │
└─────────────────────────────────────┘
```

---

## 8. Responsive Design

### Chiến lược

Không dùng media query CSS truyền thống. Thay vào đó, dùng hook `useResponsive()` để trả về các boolean (`isMobile`, `isTablet`, `isDesktop`) và quyết định layout ngay trong JSX bằng inline style.

**Ưu điểm:** Logic responsive nằm cùng chỗ với component, dễ đọc và debug.

### Bảng Responsive

| Component       | Mobile (< 768)        | Tablet (768–1024) | Desktop (> 1024)   |
| --------------- | --------------------- | ----------------- | ------------------ |
| Navbar          | Hamburger menu drawer | Links đầy đủ      | Links + CTA button |
| HeroSection     | 1 cột dọc             | 1 cột dọc         | 2 cột ngang        |
| TopCharts       | 1 cột                 | 2 cột             | 2 cột              |
| PlaylistSection | 2 cột                 | 3 cột             | 4 cột              |
| ArtistSection   | 2 cột (4 artists)     | 3 cột             | 5 cột              |
| CTABanner       | Dọc                   | Ngang             | Ngang              |
| MiniPlayer      | Controls rút gọn      | Đầy đủ            | Đầy đủ + volume    |

---

## 9. Hướng Dẫn Cài Đặt & Chạy

### Yêu cầu

- Node.js >= 18
- npm >= 9 hoặc yarn >= 1.22

### Khởi tạo dự án với Vite

```bash
# Tạo project React mới
npm create vite@latest musicforme -- --template react

# Di chuyển vào thư mục
cd musicforme

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

### Thêm file vào project

Sau khi tạo project, thay thế nội dung `src/` bằng cấu trúc đã mô tả ở Mục 3. Sau đó cập nhật `src/main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Build production

```bash
npm run build
# Output tại: dist/
```

### Deploy

| Nền tảng         | Lệnh / Hướng dẫn                         |
| ---------------- | ---------------------------------------- |
| **Vercel**       | `vercel deploy` hoặc kết nối GitHub repo |
| **Netlify**      | Kéo thả thư mục `dist/` lên netlify.com  |
| **GitHub Pages** | Dùng `gh-pages` package                  |

---

## 10. Hướng Phát Triển Tiếp Theo

### Tính năng có thể thêm

| Tính năng                | Độ ưu tiên | Ghi chú                              |
| ------------------------ | ---------- | ------------------------------------ |
| Tích hợp API nhạc thật   | Cao        | Dùng Spotify API hoặc NhacCuaTui API |
| Search bài hát           | Cao        | Thêm thanh tìm kiếm vào Navbar       |
| Trang chi tiết nghệ sĩ   | Trung bình | Cần React Router                     |
| Dark / Light mode toggle | Trung bình | Thêm context theme                   |
| Authentication           | Trung bình | Đăng nhập / đăng ký người dùng       |
| Playlist cá nhân         | Thấp       | Cần backend + database               |
| Offline mode (PWA)       | Thấp       | Service Worker + Web Audio API       |
| Scroll animation         | Thấp       | Dùng Intersection Observer API       |

### Nâng cấp kỹ thuật

- **State management:** Chuyển sang `useContext` + `useReducer` khi app phức tạp hơn
- **Data fetching:** Thêm `React Query` hoặc `SWR` để cache API
- **Testing:** Viết unit test bằng `Vitest` + `@testing-library/react`
- **TypeScript:** Migrate sang `.tsx` để type-safe toàn bộ props và data

---
