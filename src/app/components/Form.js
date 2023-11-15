'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, usePathname, redirect } from 'next/navigation';
import { FaSpinner } from "react-icons/fa";
import dateFormat from "dateformat";
import Link from 'next/link'
import Input from './Input'
import Select from './Select'
import Datepicker from './Datepicker'
import Button from './Button'
import countryList from '../data/country.json';
import statesList from '../data/states.json';
// import useDebounce from '../hooks/useDebounce';
import styles from '../styles/Form.module.scss'

const Form = ({ popupCallback }) => {
  const pathname = usePathname()
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const defaultFormValues = {
    salutation: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    password: "",
    password_confirmation: "",
    verified_email: true,
    country: params.locale === 'fr' ? "France" : "United States of America",
    postcode: "",
    city: "",
    state: '',
    accepts_marketing: false,
    accept_marketing_privacy: true,
    rm_program: `${process.env.NEXT_PUBLIC_SHOPIFY_RM_PROGRAM}`
  }
  const [form, setForm] = useState(defaultFormValues)

  const t = useTranslations('Form');

  const salutationList = [
    {
      value: "Mr.",
      label: t('salutation.options.option1')
    },
    {
      value: "Mr. & Mrs.",
      label: t('salutation.options.option2')
    },
    {
      value: "Ms.",
      label: t('salutation.options.option3')
    },
    {
      value: "Mrs.",
      label: t('salutation.options.option4')
    },
    {
      value: "Miss.",
      label: t('salutation.options.option5')
    },
    {
      value: "Dr.",
      label: t('salutation.options.option6')
    },
    {
      value: "NA",
      label: t('salutation.options.option7')
    }
  ]

  const handleReset = () => {
    setTimer(0);
  }

  useEffect(() => {
    const formHasEmptyValues = Object.values(form).filter((val) => val);
    if(formHasEmptyValues.length > 4) {
      let interval = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);
      if(timer >= 180) { // 3 minutes
        redirect(`${pathname}`);
      }
      ['mousemove', 'touchstart', 'keypress'].forEach(evt => {
        document.addEventListener(evt, handleReset);
      });
      return (() => {
        clearInterval(interval);

        ['mousemove', 'touchstart', 'keypress'].forEach(evt => {
          document.removeEventListener(evt, handleReset);
        });
      })
    }
  }, [form, timer, pathname]);

  const handleChange = (e) => {
    e.persist();

    let { name, value } = e.target;

    if(name === 'country') {
      if(value.indexOf('China') > -1) {
        popupCallback(true, name);
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }

    setForm(prevState => {
      return {
        ...prevState,
        [name]: name === 'email' ? value.trim() : value
      }
    });

    handleValidation({}, name, value);
  }

  const handleMarketing = () => {
    setForm(prevState => {
      return {...prevState, 'accepts_marketing': !form.accepts_marketing }
    })
  }

  const handleDate = (e) => {
    if(!e.value) return;
    const formDate = e.value;
    const dateValue = new Date(formDate);
    setForm(prevState => {
      return {
        ...prevState,
        [e.name]: dateFormat(dateValue, 'yyyy-mm-dd')
      }
    });
    handleValidation({}, e.name, formDate);
  }

  function handleValidation(obj, currentId, currentValue) {
    const currentDate = new Date();
    const estimated_year = currentDate.getFullYear() - Number(18);

    if(!currentId) {
      Object.keys(obj).map(key => {
        if(!obj[key]) {
          if(key === 'salutation' || key === 'first_name' || key === 'last_name' || key === 'country'
          || key === 'state' || key === 'birth_date' || key === 'city' || key === 'postcode' || key === 'email'
          || key === 'password' || key === 'password_confirmation') {
            setErrors((prevState) => {
              return {
                ...prevState,
                [key]: t('error.emptyField')
              }
            })
          }
        } else {
          if(key === 'birth_date') {
            // const year = dateFormat(obj[key], 'yyyy');

            let legalAge = 18;
            let birthdate = new Date(obj[key]);
            birthdate.setDate(birthdate.getDate() + 1);
            let ageDiffMonths = Date.now() - birthdate.getTime();
            let ageDate = new Date(ageDiffMonths);
            let actualAge = Math.abs(ageDate.getFullYear() - 1970);
            // let year_of_birth = new Date().getUTCFullYear() - actualAge;

            if(actualAge < legalAge && actualAge < 125){
              setErrors((prevState) => {
                return {
                  ...prevState,
                  [key]: t('error.birthDate')
                }
              })
            }
          } else {
            setErrors((prevState) => {
              return {
                ...prevState,
                [key]: ''
              }
            })
          }
        }
      })
    } else {
      if(!currentValue) {
        if(currentId === 'salutation' || currentId === 'first_name' || currentId === 'last_name' || currentId === 'country'
        || currentId === 'state' || currentId === 'birth_date' || currentId === 'city' || currentId === 'postcode'
        || currentId === 'email' || currentId === 'password' || currentId === 'password_confirmation') {
          setErrors((prevState) => {
            return {
              ...prevState,
              [currentId]: t('error.emptyField')
            }
          })
        }
      } else {
        if(currentId === 'birth_date') {
          const year = dateFormat(currentValue, 'yyyy');
          if(Number(year) > estimated_year) {
            setErrors((prevState) => {
              return {
                ...prevState,
                [currentId]: t('error.birthDate')
              }
            })
          } else {
            setErrors((prevState) => {
              return {
                ...prevState,
                [currentId]: ''
              }
            })
          }
        } else {
          setErrors((prevState) => {
            return {
              ...prevState,
              [currentId]: ''
            }
          })
        }
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValues = form

    handleValidation(form);
    if(errors.birth_date) {
      formValues = {
        ...formValues,
        salutation: '' // just to block the submission since current birth_date is not required in the api
      }
    } else {
      formValues = {
        ...formValues,
        salutation: form.salutation
      }
    }
    await fetch('/api/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },  body: JSON.stringify(formValues)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setLoading(false);

      if(data.errors) {
        if(data.errors.hasOwnProperty('email') || data.errors.hasOwnProperty('password') ||
          data.errors.hasOwnProperty('password_confirmation') || data.errors.hasOwnProperty('phone')) {
          const emailError = data.errors.email;
          const phoneError = data.errors.phone;
          let emailErrorMsg = '';
          let phoneErrorMsg = '';

          if(data.errors.email) {
            emailErrorMsg = emailError[0].indexOf('invalid') > -1 ? t('error.emailInvalid') : 
              emailError[0].indexOf('taken') > -1 ? t('error.emailTaken') : ''
          }

          if(data.errors.phone) {
            phoneErrorMsg = phoneError[0].indexOf('valid') > -1 ? t('error.phoneInvalid') : 
              phoneError[0].indexOf('taken') > -1 ? t('error.phoneTaken') : ''
          }
          
          setErrors(prevState => {
            return {
              ...prevState,
              'email': emailErrorMsg,
              'phone': phoneErrorMsg,
              'password': `${data.errors.password ? t('error.passwordInvalid') : ''}`,
              'password_confirmation': `${data.errors.password_confirmation ? t('error.passwordNotMatched') : ''}`
            }
          })
        } 
      } else {
        if(data.message) {
          const userDetails = {
            first_name: data.message.first_name,
            last_name: data.message.last_name
          }
          localStorage.setItem('user_details', JSON.stringify(userDetails));

          setTimeout(() => {
            // location.href = `${params.locale === 'en' ? '' : params.locale}/confirmation`;
            location.href = `${pathname}/confirmation`;
          }, 300)
        }
      }
    })
  }

  const handlePopup = (e) => {
    e.preventDefault();
    const { id } = e.target;

    popupCallback(true, id);
  }

  const handleButtonClick = (e) => {
    setLoading(true);
  }

  return (
    <>
      <form
        action="/"
        method="POST"
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.group}>
          <Select
            options={salutationList}
            defaultOption=''
            placeholder={t('salutation.text')}
            id='salutation'
            value={form.salutation}
            callback={e => handleChange(e)}
            error={errors.salutation}
            isRequired={true}
          />
        </div>
        <div className={`${styles.group} ${styles.groupHalf}`}>
          <Input
            id='first_name'
            placeholder={t('firstName')}
            value={form.first_name}
            onChange={e => handleChange(e)}
            isRequired={true}
            error={errors.first_name}
          />
        </div>
        <div className={`${styles.group} ${styles.groupHalf} ${styles.groupHalfLast}`}>
          <Input
            id='last_name'
            placeholder={t('lastName')}
            value={form.last_name}
            onChange={e => handleChange(e)}
            isRequired={true}
            error={errors.last_name}
          />
        </div>
        <div className={styles.group}>
          <Select
            id='country'
            options={countryList.data}
            defaultOption={form.country}
            placeholder={t('country')}
            callback={e => handleChange(e)}
            isRequired={true}
            error={errors.country}
          />
        </div>
        {form.country === 'United States of America' && (
          <div className={styles.group}>
            <Select
              id='state'
              options={statesList.data[0].us}
              defaultOption={''}
              placeholder={t('state')}
              callback={e => handleChange(e)}
              isRequired={true}
              error={errors.state}
            />
          </div>
        )}
        <div className={`${styles.group} ${styles.groupHalf}`}>
          <Input
            id='city'
            placeholder={t('city')}
            value={form.city}
            onChange={e => handleChange(e)}
            isRequired={true}
            error={errors.city}
          />
        </div>
        <div className={`${styles.group} ${styles.groupHalf} ${styles.groupHalfLast}`}>
          <Input
            id='postcode'
            placeholder={t('postcode')}
            value={form.postcode}
            onChange={e => handleChange(e)}
            isRequired={true}
            error={errors.postcode}
          />
        </div>
        <div className={styles.group}>
           <Datepicker
            label={t('birthDate')}
            id="birth_date"
            value={form.birth_date}
            callback={e => handleDate(e)}
            isRequired={true}
            error={errors.birth_date}
          />
        </div>
        <div className={styles.group}>
          <Input
            id='email'
            placeholder={t('email')}
            type={'email'}
            value={form.email}
            onChange={e => handleChange(e)}
            isRequired={true}
            error={errors.email}
          />
        </div>
        <div className={styles.group}>
          <Input
            id='phone'
            placeholder={t('phone')}
            value={form.phone}
            onChange={e => handleChange(e)}
            isRequired={false}
            error={errors.phone}
          />
        </div>
        <div className={styles.group}>
          <Input
            id='password'
            placeholder={t('password.text')}
            type={'password'}
            value={form.password}
            onChange={e => handleChange(e)}
            info={t('password.info')}
            error={errors.password}
            isRequired={true}
          />
        </div>
        <div className={styles.group}>
          <Input
            id='password_confirmation'
            placeholder={t('confirmPassword')}
            value={form.password_confirmation}
            onChange={e => handleChange(e)}
            type={'password'}
            error={errors.password_confirmation}
            isRequired={true}
          />
        </div>
        <div className={`${styles.group}`}>
          <div className={styles.groupMarketing}>
            <Input
              id='accepts_marketing'
              value={form.accepts_marketing}
              onChange={e => handleMarketing(e)}
              type={'checkbox'}
              error={''}
            />
            <p className={styles.infoCheckbox}>
              {t('acceptEmailMarketing')}
            </p>
          </div>
        </div>
        <div className={styles.group}>
          <Button
            label={loading ? '' : t('registerButton')}
            disabled={disabled}
            onClick={e => handleButtonClick(e)}
          />
          {loading && (
            <FaSpinner className={styles.loading} />
          )}
        </div>
        <div className={styles.group}>
          <p className={styles.text}>
            {t('acceptPrivacyPolicy.text1')}<Link href="/" id={'privacy'}  onClick={e => handlePopup(e)}>{t('acceptPrivacyPolicy.text2')}</Link>{t('acceptPrivacyPolicy.text3')}
          </p>
        </div>
      </form>
    </>
  )
}

export default Form;
