import '../public/style.css'

const PLAN_DATA = {
    free: {label: 'Free', price: '€0 / Month'},
    pro: {label: 'Pro', price: '€0,99 / Month'},
    premium: {label: 'Premium', price: '€2,99 / Month'},
}

let selectedPlan = null
let isAuthenticated = false

const checkoutForm = document.getElementById('checkout-form')
const contactForm = document.getElementById('contact-form')
const summary = document.getElementById('plan-summary')
const success = document.getElementById('success')
const successAudio = document.getElementById('success-jingle')

const authPanel = document.getElementById('auth-panel')
const loginToggle = document.getElementById('auth-login-toggle')
const signupToggle = document.getElementById('auth-signup-toggle')
const loginForm = document.getElementById('login-form')
const signupForm = document.getElementById('signup-form')
const authStatus = document.getElementById('auth-status')
const authActions = document.getElementById('auth-actions')
const authBadge = document.getElementById('auth-badge')
const navAuthToggle = document.getElementById('nav-auth-toggle')

const year = document.getElementById('year')

if (authBadge) authBadge.hidden = true
if (authActions) authActions.hidden = false

if (year) {
    year.textContent = String(new Date().getFullYear())
}

function setPlan(planKey) {

    if (!summary) return

    if (selectedPlan) {
        const selectedPlanBefore = document.getElementById(selectedPlan)
        selectedPlanBefore?.classList.remove('selected')
    }

    selectedPlan = planKey
    const data = PLAN_DATA[planKey]

    summary.textContent = `Plan chosen: ${data.label} (${data.price}).`

    const selectedPlanCard = document.getElementById(planKey)
    selectedPlanCard?.classList.add('selected')
}

function setToggleState(activeMode) {
    if (loginToggle) loginToggle.setAttribute('aria-expanded', String(activeMode === 'login'))
    if (signupToggle) signupToggle.setAttribute('aria-expanded', String(activeMode === 'signup'))
}

function showAuth(mode) {
    if (!authPanel || !loginForm || !signupForm) return

    authPanel.hidden = false
    loginForm.hidden = mode !== 'login'
    signupForm.hidden = mode !== 'signup'
    setToggleState(mode)

    const firstInput = authPanel.querySelector('input:not([type="hidden"])')
    firstInput?.focus?.()
}

function hideAuth() {
    if (!authPanel || !loginForm || !signupForm) return

    authPanel.hidden = true
    loginForm.hidden = true
    signupForm.hidden = true
    setToggleState(null)
}

function showAuthStatus(message) {
    if (!authStatus) return
    authStatus.textContent = message
    authStatus.hidden = false
    authStatus.focus?.()

    window.setTimeout(() => {
        if (authStatus) authStatus.hidden = true
    }, 10000)
}

function setAuthLoggedIn(mode) {

    isAuthenticated = true

    if (authActions) authActions.hidden = true

    hideAuth()


    if (authBadge) {
        authBadge.textContent = mode === 'signup' ? 'Logged in (new account)' : 'Logged in'
        authBadge.hidden = false
    }

    showAuthStatus(
        mode === 'signup'
            ? 'Sign up successful. You are now logged in.'
            : 'Login successful. You are now logged in.'
    )

    updateNavAuthButton()
    updateCheckoutNotice()

    if (successAudio) {
        successAudio.currentTime = 0
        successAudio.play().catch(() => {
        })
    }
}

function setAuthLoggedOut() {
    isAuthenticated = false

    if (authBadge) authBadge.hidden = true

    if (authActions) authActions.hidden = false

    hideAuth()
    updateNavAuthButton()
    updateCheckoutNotice()
    showAuthStatus('You have been logged out.')
}

function updateCheckoutNotice() {
    if (!summary) return

    if (selectedPlan && isAuthenticated) {
        summary.textContent = ''
        summary.hidden = true
    } else {
        summary.hidden = summary.textContent.trim() === ''
    }
}

function updateNavAuthButton() {
    if (!navAuthToggle) return
    navAuthToggle.textContent = isAuthenticated ? 'Logout' : 'Login'
}

document.querySelectorAll('[data-plan]').forEach((el) => {
    el.addEventListener('click', () => setPlan(el.dataset.plan))
})

if (checkoutForm) {

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!selectedPlan || !isAuthenticated) {
            if (summary) {
                if (!selectedPlan && !isAuthenticated) {
                    summary.textContent =
                        'Please select a plan and log in or create an account to continue.'
                } else if (!selectedPlan) {
                    summary.textContent =
                        'Please select a plan first before continuing.'
                } else {
                    summary.textContent =
                        'Please log in or create an account to continue.'
                }

                summary.hidden = false
                summary.focus?.()
            }
            return
        }

        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity()
            return
        }

        if (success) {
            success.hidden = false
            success.scrollIntoView({behavior: 'smooth'})
        }

        if (successAudio) {
            successAudio.currentTime = 0
            successAudio.play().catch(() => {
            })
        }

    })
}

if (contactForm) {

    let status = document.getElementById('form-status')
    const successAudio = document.getElementById('success-jingle')

    if (!status) {
        status = document.createElement('p')
        status.id = 'form-status'
        status.className = 'notice'
        status.setAttribute('role', 'status')
        status.setAttribute('aria-live', 'polite')
        status.hidden = true

        contactForm.insertAdjacentElement('afterend', status)
    } else {
        status.setAttribute('role', status.getAttribute('role') || 'status')
        status.setAttribute('aria-live', status.getAttribute('aria-live') || 'polite')
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity()
            return
        }

        contactForm.reset()

        status.textContent = 'Your message has been submitted! Thank you for contacting us!'
        status.hidden = false
        status.focus?.()

        setTimeout(() => {
            status.hidden = true
        }, 10000)

        if (successAudio) {
            successAudio.currentTime = 0
            successAudio.play().catch(() => {
            })
        }
    })
}

if (authPanel && loginToggle && signupToggle && loginForm && signupForm) {
    document.querySelectorAll('[data-auth-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.authToggle

            const isLoginOpen = !authPanel.hidden && !loginForm.hidden
            const isSignupOpen = !authPanel.hidden && !signupForm.hidden

            if ((mode === 'login' && isLoginOpen) || (mode === 'signup' && isSignupOpen)) {
                hideAuth()
                return
            }

            showAuth(mode)
        })
    })

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity()
            return
        }

        loginForm.reset()
        setAuthLoggedIn('login')
    })

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!signupForm.checkValidity()) {
            signupForm.reportValidity()
            return
        }

        const pw = document.getElementById('signup-password')
        const pw2 = document.getElementById('signup-password2')

        if (pw && pw2 && pw.value !== pw2.value) {
            pw2.setCustomValidity('Passwords do not match.')
            signupForm.reportValidity()
            pw2.setCustomValidity('')
            pw2.focus?.()
            return
        }

        signupForm.reset()
        setAuthLoggedIn('signup')
    })
}

if (navAuthToggle) {
    updateNavAuthButton()

    navAuthToggle.addEventListener('click', () => {
        if (isAuthenticated) {
            setAuthLoggedOut()
            return
        }

        const loginSection = document.getElementById('login')
        loginSection?.scrollIntoView({behavior: 'smooth', block: 'start'})

        const isLoginOpen = authPanel && !authPanel.hidden && loginForm && !loginForm.hidden
        if (isLoginOpen) {
            hideAuth()
        } else {
            showAuth('login')
        }
    })
}