import React, { useState } from 'react';
import { createFamily, joinFamily, updateUserFamily } from '../lib/db';
import { useAuth } from '../contexts/AuthContext';
import './Onboarding.css';

export default function Onboarding({ onComplete }) {
    const { currentUser } = useAuth();
    const [mode, setMode] = useState('initial'); // initial, create, join
    const [familyName, setFamilyName] = useState('');
    const [familyId, setFamilyId] = useState('');
    const [error, setError] = useState('');

    async function handleCreate() {
        try {
            const newFamilyId = await createFamily(familyName, currentUser.uid);
            await updateUserFamily(currentUser.uid, newFamilyId);
            onComplete(newFamilyId);
        } catch (err) {
            setError('SYSTEM ERROR: Failed to create family');
            console.error(err);
        }
    }

    async function handleJoin() {
        try {
            const success = await joinFamily(familyId, currentUser.uid);
            if (success) {
                await updateUserFamily(currentUser.uid, familyId);
                onComplete(familyId);
            } else {
                setError('ERROR: Family not found');
            }
        } catch (err) {
            setError('SYSTEM ERROR: Failed to join family');
            console.error(err);
        }
    }

    if (mode === 'initial') {
        return (
            <div className="onboarding-container">
                <div className="onboarding-panel">
                    <h2 className="onboarding-title">Welcome!</h2>
                    <p className="onboarding-description">
                        Initialize family system to continue
                    </p>
                    <div className="onboarding-buttons">
                        <button onClick={() => setMode('create')} className="retro-btn">
                            Create New Family
                        </button>
                        <button onClick={() => setMode('join')} className="retro-btn retro-btn-secondary">
                            Join Existing Family
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'create') {
        return (
            <div className="onboarding-container">
                <div className="onboarding-panel">
                    <h2 className="onboarding-title">Create Family</h2>
                    <div className="onboarding-form">
                        <input
                            type="text"
                            placeholder="Family Name (e.g. The Smiths)"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                        />
                        <div className="onboarding-form-buttons">
                            <button onClick={handleCreate} className="retro-btn">
                                Create
                            </button>
                            <button onClick={() => setMode('initial')} className="retro-btn retro-btn-secondary">
                                Cancel
                            </button>
                        </div>
                        {error && <p className="onboarding-error">{error}</p>}
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'join') {
        return (
            <div className="onboarding-container">
                <div className="onboarding-panel">
                    <h2 className="onboarding-title">Join Family</h2>
                    <p className="onboarding-description">
                        Request Family ID from existing member
                    </p>
                    <div className="onboarding-form">
                        <input
                            type="text"
                            placeholder="Family ID"
                            value={familyId}
                            onChange={(e) => setFamilyId(e.target.value)}
                        />
                        <div className="onboarding-form-buttons">
                            <button onClick={handleJoin} className="retro-btn">
                                Join
                            </button>
                            <button onClick={() => setMode('initial')} className="retro-btn retro-btn-secondary">
                                Cancel
                            </button>
                        </div>
                        {error && <p className="onboarding-error">{error}</p>}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
