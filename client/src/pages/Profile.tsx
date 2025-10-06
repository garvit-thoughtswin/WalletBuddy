import { useEffect, useState } from "react"
import { getUserProfile } from "../services/authService";
import type { UserProfileType } from "../types/form";

function Profile() {

    const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            const profile = await getUserProfile();
            setUserProfile(profile);
        }   
        fetchProfile();
    }, [])

    return (
        <>
            <div className="p-4 text-center flex flex-col gap-4">
                <h1 className="font-bold text-2xl">User Profile</h1>
                <p>Name: {userProfile && userProfile.name}</p>
                <p>Email: {userProfile && userProfile.email}</p>
            </div>
        </>
    )
}

export default Profile
