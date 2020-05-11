import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import firebase from 'gatsby-plugin-firebase';
import React, { useEffect, useState } from 'react';

import AdminDashboardApp from '../components/AdminDashboardApp';
import ChartsApp from '../components/charts/ChartsApp';
import LastArrivedApp from '../components/LastArrivedApp';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

const IndexPage = () => {
    const [employees, setEmployees] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(true)
    const auth = useAuth()

    useEffect(() => {
        firebase.firestore().collection("employees").onSnapshot(handleSnapshot)
    }, [])

    useEffect(() => {
        setShowSnackbar(auth.user ? false : true)
    }, [auth.user])

    const handleSnapshot = snapshot => {
        const dbEmployees = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        setEmployees(dbEmployees)
    }

    const closeSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <Layout>
            {auth.user && <ChartsApp employees={employees} />}
            {auth.user && <AdminDashboardApp employees={employees} />}
            {!auth.user && <LastArrivedApp employees={employees} />}
            <Snackbar
                open={showSnackbar}
                message='User admin@admin.com, Pass admin1'
                action={
                    <IconButton color='inherit' onClick={closeSnackbar}>
                        <CloseIcon />
                    </IconButton>
                }
            />
        </Layout>
    )
}

export default IndexPage
