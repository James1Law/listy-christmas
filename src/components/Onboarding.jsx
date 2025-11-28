import React, { useState } from 'react';
import { createFamily, joinFamily, updateUserFamily } from '../lib/db';
import { useAuth } from '../contexts/AuthContext';

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
            setError('Failed to create family');
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
                setError('Family not found');
            }
        } catch (err) {
            setError('Failed to join family');
            console.error(err);
        }
    }

    if (mode === 'initial') {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Welcome!</h2>
                <p>To get started, you need to be part of a family group.</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={() => setMode('create')}>Create a New Family</button>
                    <button onClick={() => setMode('join')} style={{ backgroundColor: '#165b33' }}>Join Existing Family</button>
                </div>
            </div>
        );
    }

    if (mode === 'create') {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Create Family</h2>
                <input
                    type="text"
                    placeholder="Family Name (e.g. The Smiths)"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button onClick={handleCreate}>Create</button>
                <button onClick={() => setMode('initial')} style={{ marginLeft: '10px', backgroundColor: '#999' }}>Cancel</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }

    if (mode === 'join') {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Join Family</h2>
                <p>Ask a family member for their Family ID.</p>
                <input
                    type="text"
                    placeholder="Family ID"
                    value={familyId}
                    onChange={(e) => setFamilyId(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px' }}
                />
                <button onClick={handleJoin}>Join</button>
                <button onClick={() => setMode('initial')} style={{ marginLeft: '10px', backgroundColor: '#999' }}>Cancel</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }

    return null;
}
