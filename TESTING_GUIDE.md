# 🧪 **TESTING GUIDE**

**Encryption Visualizer - Complete Testing Documentation**

---

## 📋 **Pre-Testing Checklist**

Before starting tests, ensure:

- [ ] ✅ Browser cache is cleared (see `CACHE_FIX_GUIDE.md`)
- [ ] ✅ Dev server is running (`pnpm run dev`)
- [ ] ✅ Using Incognito/Private window (recommended)
- [ ] ✅ DevTools console is open (F12)
- [ ] ✅ No console errors present

---

## 🏠 **TEST 1: Homepage**

### **URL:** `http://localhost:3000/`

### **Expected Visual Elements:**
- [ ] Dark navy gradient background
- [ ] Animated floating orbs (3-4 orbs moving smoothly)
- [ ] Header with "Encryption Visualizer" title
- [ ] Navigation links (Home, AES, RSA, Hashing)
- [ ] Hero section with gradient text
- [ ] Three algorithm cards with glassmorphism effect:
  - [ ] **AES Card** (blue/cyan gradient, lock icon)
  - [ ] **RSA Card** (purple/pink gradient, key icon)
  - [ ] **Hashing Card** (emerald/teal gradient, hash icon)

### **Interactive Tests:**
1. **Hover Effects**
   - [ ] Algorithm cards scale up on hover
   - [ ] "Explore" buttons glow on hover
   - [ ] Navigation links highlight on hover

2. **Navigation**
   - [ ] Click "AES" card → navigates to `/aes`
   - [ ] Click "RSA" card → navigates to `/rsa`
   - [ ] Click "Hashing" card → navigates to `/hashing`
   - [ ] Header navigation links work
   - [ ] "Encryption Visualizer" logo returns to home

3. **Animations**
   - [ ] Floating orbs animate smoothly (60fps)
   - [ ] Page transitions are smooth
   - [ ] No jank or stuttering

### **Console Check:**
- [ ] No errors in console
- [ ] No warnings (except dev warnings are OK)

---

## 🔐 **TEST 2: AES Page**

### **URL:** `http://localhost:3000/aes`

### **Visual Elements:**
- [ ] Header with navigation
- [ ] AES gradient background (blue/cyan)
- [ ] Three-column layout (input | visualization | educational)
- [ ] Input panel on left
- [ ] State matrix in center
- [ ] Educational sidebar on right

### **Input Panel Tests:**

1. **Load Example**
   - [ ] Click "Load Example" button
   - [ ] Plaintext fills with "Hello World!"
   - [ ] Key fills with "SecretKey123456"

2. **Custom Input**
   - [ ] Type custom plaintext (test: "Test123")
   - [ ] Type custom key (test: "MyKey1234567890")
   - [ ] Character counter updates
   - [ ] Warning appears if key is wrong length

3. **Start Encryption**
   - [ ] Click "Start Encryption" button
   - [ ] Visualization begins
   - [ ] Button becomes disabled during encryption
   - [ ] Playback controls appear

### **Visualization Tests:**

1. **State Matrix**
   - [ ] 4×4 grid displays (16 cells)
   - [ ] Hex values shown in each cell
   - [ ] Initial values are correct
   - [ ] Cells highlight during transformations
   - [ ] Colors change per operation type:
     - Blue: SubBytes
     - Purple: ShiftRows
     - Green: MixColumns
     - Orange: AddRoundKey

2. **Step Information**
   - [ ] Step counter shows (e.g., "Step 1 of 41")
   - [ ] Current round displays (e.g., "Round 1")
   - [ ] Operation name shown (e.g., "SubBytes")
   - [ ] Description explains what's happening
   - [ ] Formula/calculation details visible

3. **Playback Controls**
   - [ ] **Play button** starts auto-advance
   - [ ] **Pause button** stops auto-advance
   - [ ] **Previous button** goes to previous step
   - [ ] **Next button** goes to next step
   - [ ] **Reset button** returns to step 1
   - [ ] **Speed slider** adjusts playback speed (0.5x to 4x)
   - [ ] Speed label updates correctly

4. **All 41 Steps**
   - [ ] Step 1: Initial AddRoundKey
   - [ ] Steps 2-11: Round 1 (SubBytes, ShiftRows, MixColumns, AddRoundKey)
   - [ ] Steps 12-40: Rounds 2-9 (4 steps each)
   - [ ] Step 41: Final round (SubBytes, ShiftRows, AddRoundKey)

### **Educational Sidebar Tests:**

1. **Content Sections** (should have 9 sections)
   - [ ] Overview
   - [ ] How It Works
   - [ ] Key Components
   - [ ] S-Box Substitution
   - [ ] ShiftRows
   - [ ] MixColumns
   - [ ] AddRoundKey
   - [ ] Security Considerations
   - [ ] Real-World Applications

2. **Interactions**
   - [ ] Sections are collapsible (click to expand/collapse)
   - [ ] Content displays properly when expanded
   - [ ] Icons indicate expand/collapse state
   - [ ] Smooth transitions when expanding/collapsing

3. **Quiz Questions**
   - [ ] Quiz section present
   - [ ] 8 questions with multiple choice
   - [ ] Can select answers
   - [ ] Correct/incorrect feedback shown
   - [ ] Score tracking works

### **Console Check:**
- [ ] No errors during visualization
- [ ] No memory leaks (use Performance monitor)
- [ ] Smooth 60fps animations

---

## 🔑 **TEST 3: RSA Page**

### **URL:** `http://localhost:3000/rsa`

### **Visual Elements:**
- [ ] Header with navigation
- [ ] RSA gradient background (purple/pink)
- [ ] Two main sections: Key Generation | Encryption/Decryption
- [ ] Input panel for key generation
- [ ] Visualization area for steps
- [ ] Encryption/decryption panel

### **Key Generation Tests:**

1. **Key Size Selection**
   - [ ] Three radio buttons (Small, Medium, Large)
   - [ ] Default selection is "Small"
   - [ ] Can change selection
   - [ ] Label updates to show bit size

2. **Generate Keys**
   - [ ] Click "Generate Keys" button
   - [ ] Loading/generating state shown
   - [ ] 7 steps display sequentially:
     - [ ] Step 1: Select first prime (p)
     - [ ] Step 2: Select second prime (q)
     - [ ] Step 3: Calculate modulus (n = p × q)
     - [ ] Step 4: Calculate phi φ(n) = (p-1)(q-1)
     - [ ] Step 5: Select public exponent (e)
     - [ ] Step 6: Calculate private exponent (d)
     - [ ] Step 7: Key pair generated

3. **Step Visualization**
   - [ ] Each step shows:
     - [ ] Step number and title
     - [ ] Description of what's happening
     - [ ] Mathematical formula
     - [ ] Calculated values (p, q, n, phi, e, d)
   - [ ] Values are highlighted/animated
   - [ ] Formulas are readable and correct

4. **Key Display**
   - [ ] Public key shown (n, e)
   - [ ] Private key shown (n, d)
   - [ ] Values displayed in readable format
   - [ ] Copy buttons work (if implemented)
   - [ ] Primes p and q shown separately

### **Encryption/Decryption Tests:**

1. **Message Input**
   - [ ] Text input for message
   - [ ] Placeholder text shown
   - [ ] Can type custom message
   - [ ] Character counter updates
   - [ ] Message must be numeric for RSA

2. **Encrypt Message**
   - [ ] Click "Encrypt" button
   - [ ] Encryption formula shown (C = M^e mod n)
   - [ ] Encrypted value displays
   - [ ] Animation/highlight effect
   - [ ] Values are correct

3. **Decrypt Message**
   - [ ] Click "Decrypt" button
   - [ ] Decryption formula shown (M = C^d mod n)
   - [ ] Decrypted value displays
   - [ ] Should match original message
   - [ ] Animation/highlight effect

4. **Full Cycle Test**
   - [ ] Original message: 42
   - [ ] Encrypt: C = 42^e mod n
   - [ ] Decrypt: M = C^d mod n
   - [ ] Final result: 42 (matches original)

### **Playback Controls (if present):**
- [ ] Can step through key generation
- [ ] Previous/next buttons work
- [ ] Speed control works
- [ ] Reset button works

### **Console Check:**
- [ ] No errors during key generation
- [ ] No errors during encryption/decryption
- [ ] Prime generation completes quickly

---

## #️⃣ **TEST 4: Hashing Page**

### **URL:** `http://localhost:3000/hashing`

### **Visual Elements:**
- [ ] Header with navigation
- [ ] Hashing gradient background (emerald/teal)
- [ ] Two main sections: Hash Visualization | Avalanche Effect
- [ ] Input panel for message
- [ ] Visualization area for steps
- [ ] Avalanche effect demo panel

### **Hash Visualization Tests:**

1. **Message Input**
   - [ ] Text input for message
   - [ ] Placeholder: "Enter text to hash..."
   - [ ] Can type any text
   - [ ] "Load Example" button works
   - [ ] Character counter (optional)

2. **Generate Hash**
   - [ ] Click "Generate Hash" button
   - [ ] SHA-256 process begins
   - [ ] 5 steps display:
     - [ ] Step 1: Input (original message)
     - [ ] Step 2: Preprocessing (padding)
     - [ ] Step 3: Initialization (H0-H7)
     - [ ] Step 4: Compression (64 rounds)
     - [ ] Step 5: Output (final 256-bit hash)

3. **Step Visualization**
   - [ ] Each step shows:
     - [ ] Step number and title
     - [ ] Description
     - [ ] Binary representation (if applicable)
     - [ ] Hex values
     - [ ] Message blocks/chunks
   - [ ] Data is properly formatted
   - [ ] Monospace font for hash values

4. **Hash Output**
   - [ ] Final hash is 64 characters (256 bits = 32 bytes = 64 hex chars)
   - [ ] Hash is displayed in monospace font
   - [ ] Copy button works (if implemented)
   - [ ] Hash is correct for given input

5. **Test Known Hash**
   - [ ] Input: "Hello World!"
   - [ ] Expected hash: `7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069`
   - [ ] Generated hash matches expected

### **Avalanche Effect Demo Tests:**

1. **Original Input**
   - [ ] Text input for base message
   - [ ] Default/example text loads
   - [ ] Can type custom message

2. **Variation Controls**
   - [ ] Options to modify input:
     - [ ] Add one character
     - [ ] Change one character
     - [ ] Change case
     - [ ] Add space
   - [ ] Apply variation button works

3. **Hash Comparison**
   - [ ] Original hash displayed
   - [ ] Modified hash displayed
   - [ ] Both hashes are 64 characters
   - [ ] Hashes are completely different

4. **Bit Difference Calculator**
   - [ ] Shows bit difference count
   - [ ] Shows percentage different
   - [ ] Visual representation (color-coded bits)
   - [ ] Should show ~50% difference (avalanche effect)

5. **Test Avalanche Effect**
   - [ ] Input: "Hello"
   - [ ] Modified: "hello" (case change)
   - [ ] Result: Drastically different hashes
   - [ ] Bit difference: ~128 bits (~50%)

### **Playback Controls:**
- [ ] Can step through hashing process
- [ ] Previous/next buttons work
- [ ] Speed control works
- [ ] Reset button works

### **Console Check:**
- [ ] No errors during hashing
- [ ] Hash calculation is fast
- [ ] Avalanche effect demo works smoothly

---

## 📱 **TEST 5: Mobile Responsiveness**

### **Devices to Test:**
- [ ] Mobile phone (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)

### **Test Method:**
1. Open DevTools (F12)
2. Click device toggle toolbar icon
3. Test different device presets:
   - [ ] iPhone SE (375×667)
   - [ ] iPhone 12 Pro (390×844)
   - [ ] iPad (768×1024)
   - [ ] Desktop (1920×1080)

### **Mobile-Specific Tests:**

1. **Navigation**
   - [ ] Hamburger menu appears on mobile
   - [ ] Clicking hamburger opens menu
   - [ ] Navigation links work in mobile menu
   - [ ] Menu closes after selection
   - [ ] No horizontal scroll

2. **Homepage Mobile**
   - [ ] Algorithm cards stack vertically
   - [ ] Cards are full width (or appropriate width)
   - [ ] Text is readable (not too small)
   - [ ] Buttons are touch-sized (44px min)
   - [ ] Hero text scales appropriately

3. **AES Page Mobile**
   - [ ] Layout switches to single column
   - [ ] Input panel on top
   - [ ] Visualization below
   - [ ] Educational sidebar below or collapsible
   - [ ] State matrix fits screen width
   - [ ] Buttons are full width or appropriate
   - [ ] No overlapping elements

4. **RSA Page Mobile**
   - [ ] Sections stack vertically
   - [ ] Key generation fits screen
   - [ ] Encryption panel below
   - [ ] Text is readable
   - [ ] Buttons are touch-friendly

5. **Hashing Page Mobile**
   - [ ] Hash visualization fits screen
   - [ ] Avalanche demo below
   - [ ] Long hash values wrap or scroll
   - [ ] All controls accessible

### **Touch Interactions:**
- [ ] Buttons respond to touch
- [ ] No double-tap zoom issues
- [ ] Scrolling is smooth
- [ ] Swipe gestures work (if any)

### **Typography Mobile:**
- [ ] Headers are appropriately sized
- [ ] Body text is readable (min 16px)
- [ ] No text overflow
- [ ] Line height is comfortable

### **Performance Mobile:**
- [ ] Animations run smoothly
- [ ] No lag or jank
- [ ] Page loads quickly
- [ ] Visualizations work well

---

## 🎨 **TEST 6: Design & Polish**

### **Color & Gradients:**
- [ ] Background gradients smooth and vibrant
- [ ] Algorithm-specific colors consistent:
  - [ ] AES: Blue/Cyan
  - [ ] RSA: Purple/Pink
  - [ ] Hashing: Emerald/Teal
- [ ] Text is readable on all backgrounds
- [ ] Color contrast meets WCAG AA standards

### **Typography:**
- [ ] Headers use Orbitron font (or specified font)
- [ ] Body text uses Inter font (or specified font)
- [ ] Code/hash values use monospace font
- [ ] Font sizes are hierarchical and appropriate
- [ ] Letter spacing is comfortable

### **Glassmorphism Effects:**
- [ ] Cards have blur backdrop effect
- [ ] Semi-transparent backgrounds
- [ ] Subtle borders
- [ ] Drop shadows are soft
- [ ] Effects enhance, not distract

### **Animations:**
- [ ] Floating orbs animate smoothly
- [ ] Transitions are smooth (no jank)
- [ ] Hover effects are responsive
- [ ] Page transitions are polished
- [ ] Loading states are clear
- [ ] 60fps maintained throughout

### **Icons:**
- [ ] All icons display correctly (Lucide React)
- [ ] Icons are appropriately sized
- [ ] Icon colors match design system
- [ ] Icons are semantically correct

### **Spacing & Layout:**
- [ ] Consistent padding throughout
- [ ] Elements are well-aligned
- [ ] White space is balanced
- [ ] No elements touching edges
- [ ] Grid/flex layouts work correctly

---

## ⚡ **TEST 7: Performance**

### **Load Time:**
- [ ] Initial page load < 3 seconds
- [ ] Subsequent navigations instant (SPA)
- [ ] Fonts load without FOUT/FOIT
- [ ] Images load progressively (if any)

### **Runtime Performance:**
- [ ] Open DevTools → Performance tab
- [ ] Record during visualization
- [ ] Check frame rate:
  - [ ] Should be 60fps consistently
  - [ ] No dropped frames
  - [ ] No long tasks (> 50ms)

### **Memory Usage:**
- [ ] Open DevTools → Memory tab
- [ ] Take heap snapshot before visualization
- [ ] Run visualization
- [ ] Take heap snapshot after
- [ ] Check for memory leaks:
  - [ ] Memory should stabilize
  - [ ] No exponential growth
  - [ ] Detached DOM nodes minimal

### **Bundle Size:**
- [ ] Run `pnpm run build`
- [ ] Check dist folder size
- [ ] Main bundle should be reasonable (< 500KB gzipped)
- [ ] Code splitting working (if implemented)

---

## 🔒 **TEST 8: Browser Compatibility**

### **Browsers to Test:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### **For Each Browser:**
- [ ] All pages load correctly
- [ ] Visualizations work
- [ ] Animations smooth
- [ ] No console errors
- [ ] Styles render correctly
- [ ] JavaScript executes properly

---

## ♿ **TEST 9: Accessibility**

### **Keyboard Navigation:**
- [ ] Can tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can activate buttons with Enter/Space
- [ ] Can close modals with Escape (if any)
- [ ] Tab order is logical
- [ ] No keyboard traps

### **Screen Reader:**
- [ ] Page structure is logical
- [ ] Headings are hierarchical (h1, h2, h3)
- [ ] Images have alt text (if any)
- [ ] Buttons have descriptive labels
- [ ] Form inputs have labels
- [ ] ARIA attributes are correct

### **Color & Contrast:**
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text)
- [ ] Interactive elements identifiable without color alone
- [ ] Focus indicators have sufficient contrast

### **Motion:**
- [ ] Animations respect `prefers-reduced-motion` (optional)
- [ ] Can pause/stop animations
- [ ] No flashing content (seizure risk)

---

## 🐛 **TEST 10: Error Handling**

### **Invalid Inputs:**
1. **AES:**
   - [ ] Empty plaintext → shows error/validation
   - [ ] Empty key → shows error/validation
   - [ ] Key wrong length → shows error/validation
   - [ ] Special characters → handled gracefully

2. **RSA:**
   - [ ] Non-numeric message → shows error/validation
   - [ ] Message > n → shows error/validation
   - [ ] Decrypt before encrypt → prevented or error shown

3. **Hashing:**
   - [ ] Empty input → shows error or uses default
   - [ ] Very long input → handles without crashing

### **Network Issues:**
- [ ] Page works offline (after initial load)
- [ ] No external dependencies break app

### **Console Errors:**
- [ ] No uncaught errors
- [ ] No unhandled promise rejections
- [ ] Warnings are dev-only (not production)

---

## ✅ **TEST 11: Final Checklist**

### **Functionality:**
- [ ] All three algorithms work correctly
- [ ] All visualizations complete without errors
- [ ] All playback controls work
- [ ] All navigation works
- [ ] All buttons/interactions work
- [ ] All forms validate correctly

### **Visual:**
- [ ] Design is professional and polished
- [ ] Colors are vibrant and consistent
- [ ] Typography is readable
- [ ] Spacing is balanced
- [ ] Animations are smooth
- [ ] Mobile layout works

### **Performance:**
- [ ] Load times are fast
- [ ] 60fps maintained
- [ ] No memory leaks
- [ ] No jank or stuttering

### **Code Quality:**
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No linter warnings
- [ ] Code is well-organized

---

## 📊 **TEST RESULTS TEMPLATE**

Use this template to record your test results:

```markdown
# Test Results - [Date]

## Browser: [Chrome/Firefox/Safari/Edge]
## Device: [Desktop/Mobile/Tablet]
## Screen Size: [1920×1080/375×667/etc]

### Homepage: [ PASS / FAIL ]
- Issues found: [none / describe issues]

### AES Page: [ PASS / FAIL ]
- Issues found: [none / describe issues]

### RSA Page: [ PASS / FAIL ]
- Issues found: [none / describe issues]

### Hashing Page: [ PASS / FAIL ]
- Issues found: [none / describe issues]

### Mobile Responsive: [ PASS / FAIL ]
- Issues found: [none / describe issues]

### Performance: [ PASS / FAIL ]
- Load time: [X seconds]
- FPS during visualization: [60fps / lower]
- Issues found: [none / describe issues]

### Overall: [ PASS / FAIL ]
- Critical bugs: [count]
- Minor bugs: [count]
- Improvements needed: [list]
```

---

## 🎯 **EXPECTED RESULTS**

If all tests pass:
- ✅ **Functionality:** 100% working
- ✅ **Design:** Professional and polished
- ✅ **Performance:** Fast and smooth
- ✅ **Mobile:** Fully responsive
- ✅ **Accessibility:** WCAG AA compliant
- ✅ **Code Quality:** Error-free

**Result:** 🎉 **PRODUCTION READY!**

---

## 📞 **Reporting Issues**

If you find bugs during testing:

1. **Note the bug details:**
   - What page/feature
   - What you did (steps to reproduce)
   - What happened (actual behavior)
   - What you expected (expected behavior)
   - Browser and device info
   - Screenshot or video (if applicable)

2. **Check console for errors:**
   - Copy full error message
   - Note line numbers and file names

3. **Document in a bug report:**
   - Priority: Critical / High / Medium / Low
   - Status: New / In Progress / Fixed

---

**Happy Testing! 🧪✨**

**Expected Outcome:** 🎉 **Everything works perfectly!**
