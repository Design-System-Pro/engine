-- SET session_replication_role = replica;

-- --
-- -- PostgreSQL database dump
-- --

-- -- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- -- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- --
-- -- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
-- 	('00000000-0000-0000-0000-000000000000', 'c06663c5-f063-471e-9f5d-307f93ac2c6b', '{"action":"user_signedup","actor_id":"104482f8-6a89-411f-bda6-decfeab93e1b","actor_username":"mail@tomasfrancisco.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-09-20 15:31:47.446567+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', 'a35d3cea-95d2-493c-9c17-106a8aad0a46', '{"action":"login","actor_id":"104482f8-6a89-411f-bda6-decfeab93e1b","actor_username":"mail@tomasfrancisco.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-20 15:31:47.449231+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', 'fa8e6829-8e7f-49eb-996e-ea31572ac1c6', '{"action":"user_recovery_requested","actor_id":"104482f8-6a89-411f-bda6-decfeab93e1b","actor_username":"mail@tomasfrancisco.com","actor_via_sso":false,"log_type":"user"}', '2024-09-20 15:31:47.460562+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', '434bf4e6-0457-4509-9d1e-8165517f90bd', '{"action":"login","actor_id":"104482f8-6a89-411f-bda6-decfeab93e1b","actor_username":"mail@tomasfrancisco.com","actor_via_sso":false,"log_type":"account"}', '2024-09-20 15:31:54.237338+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', '21696d7b-5547-4f9b-b5bd-f6b1811f378f', '{"action":"logout","actor_id":"104482f8-6a89-411f-bda6-decfeab93e1b","actor_username":"mail@tomasfrancisco.com","actor_via_sso":false,"log_type":"account"}', '2024-09-20 15:32:01.168935+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', '886fe616-7f07-4a61-98d7-0eb3f64d79ae', '{"action":"user_signedup","actor_id":"9e55f9b4-29c6-4094-b4a2-c061c477a4dc","actor_username":"tomas@getds.pro","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-09-20 15:32:09.049751+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', 'c58404ee-5438-49be-835d-da19dc90cf8b', '{"action":"login","actor_id":"9e55f9b4-29c6-4094-b4a2-c061c477a4dc","actor_username":"tomas@getds.pro","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-20 15:32:09.051986+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', '1964b04d-8e27-4fdc-ac5c-2baacd505091', '{"action":"user_recovery_requested","actor_id":"9e55f9b4-29c6-4094-b4a2-c061c477a4dc","actor_username":"tomas@getds.pro","actor_via_sso":false,"log_type":"user"}', '2024-09-20 15:32:09.056562+00', ''),
-- 	('00000000-0000-0000-0000-000000000000', 'dcb3f177-033b-46e5-9e19-cdaa5c47c1ac', '{"action":"login","actor_id":"9e55f9b4-29c6-4094-b4a2-c061c477a4dc","actor_username":"tomas@getds.pro","actor_via_sso":false,"log_type":"account"}', '2024-09-20 15:32:16.493218+00', '');


-- --
-- -- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
-- 	('c4d67fa5-bd4d-4f02-a5d4-cdb6619dd5bd', '104482f8-6a89-411f-bda6-decfeab93e1b', 'd48fb0bc-0eec-41fb-87d6-2a9371beae7b', 's256', 'y--eHgVj6jaHoAthWDFkMd8hHuuSw-iNoyvpDth4sMc', 'magiclink', '', '', '2024-09-20 15:31:47.459326+00', '2024-09-20 15:31:47.459326+00', 'magiclink', NULL),
-- 	('05e76338-0a55-4994-af29-689e5cd57a2c', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', 'ba83f534-fc91-4e05-bdec-5db59290206c', 's256', 'J8ZqWRB27AmD188-g7N6_YINLSKMasWRKQHfIBr0tlk', 'magiclink', '', '', '2024-09-20 15:32:09.055671+00', '2024-09-20 15:32:09.055671+00', 'magiclink', NULL);


-- --
-- -- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
-- 	('00000000-0000-0000-0000-000000000000', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', 'authenticated', 'authenticated', 'tomas@getds.pro', '$2a$10$THmJHrHxztfJVUmF72vMPeCMT7fcSwHEjzf9c9eSBx2SLejkavmfS', '2024-09-20 15:32:09.050121+00', NULL, '', NULL, '', '2024-09-20 15:32:09.056872+00', '', '', NULL, '2024-09-20 15:32:16.494153+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "9e55f9b4-29c6-4094-b4a2-c061c477a4dc", "email": "tomas@getds.pro", "email_verified": false, "phone_verified": false}', NULL, '2024-09-20 15:32:09.044237+00', '2024-09-20 15:32:16.496927+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', '104482f8-6a89-411f-bda6-decfeab93e1b', 'authenticated', 'authenticated', 'mail@tomasfrancisco.com', '$2a$10$ZjEGc0IMIKPi.Tl59oIIfu.Cb0WeukPHfDujO08S3unm0VV1soIDO', '2024-09-20 15:31:47.447206+00', NULL, '', NULL, '', '2024-09-20 15:31:47.460888+00', '', '', NULL, '2024-09-20 15:31:54.238379+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "104482f8-6a89-411f-bda6-decfeab93e1b", "email": "mail@tomasfrancisco.com", "email_verified": false, "phone_verified": false}', NULL, '2024-09-20 15:31:47.435121+00', '2024-09-20 15:31:54.23931+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


-- --
-- -- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
-- 	('104482f8-6a89-411f-bda6-decfeab93e1b', '104482f8-6a89-411f-bda6-decfeab93e1b', '{"sub": "104482f8-6a89-411f-bda6-decfeab93e1b", "email": "mail@tomasfrancisco.com", "email_verified": false, "phone_verified": false}', 'email', '2024-09-20 15:31:47.445011+00', '2024-09-20 15:31:47.445053+00', '2024-09-20 15:31:47.445053+00', '336f7bb3-5852-4125-9d99-0f4411256219'),
-- 	('9e55f9b4-29c6-4094-b4a2-c061c477a4dc', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', '{"sub": "9e55f9b4-29c6-4094-b4a2-c061c477a4dc", "email": "tomas@getds.pro", "email_verified": false, "phone_verified": false}', 'email', '2024-09-20 15:32:09.048387+00', '2024-09-20 15:32:09.048408+00', '2024-09-20 15:32:09.048408+00', '1f2d22ee-33fe-4c15-b9d6-49b58c1046a6');


-- --
-- -- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
-- 	('2335fc52-722c-4d40-9532-636037e4b5ff', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', '2024-09-20 15:32:09.05225+00', '2024-09-20 15:32:09.05225+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL),
-- 	('22427a08-a9ba-4a4d-9dcb-dc9624c3b9c9', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', '2024-09-20 15:32:16.494207+00', '2024-09-20 15:32:16.494207+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL);


-- --
-- -- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
-- 	('2335fc52-722c-4d40-9532-636037e4b5ff', '2024-09-20 15:32:09.053721+00', '2024-09-20 15:32:09.053721+00', 'password', 'dc3d94dd-6b56-4e8b-8456-54df1e829d3a'),
-- 	('22427a08-a9ba-4a4d-9dcb-dc9624c3b9c9', '2024-09-20 15:32:16.497194+00', '2024-09-20 15:32:16.497194+00', 'otp', '611da71a-59ca-4908-974f-617a4df4bffe');


-- --
-- -- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --

-- INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
-- 	('00000000-0000-0000-0000-000000000000', 3, 'srdqAUYNpl7SFcTo9TF3VQ', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', false, '2024-09-20 15:32:09.052797+00', '2024-09-20 15:32:09.052797+00', NULL, '2335fc52-722c-4d40-9532-636037e4b5ff'),
-- 	('00000000-0000-0000-0000-000000000000', 4, 'AlChdxm7TKsKaxp8PnrKqA', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', false, '2024-09-20 15:32:16.494621+00', '2024-09-20 15:32:16.494621+00', NULL, '22427a08-a9ba-4a4d-9dcb-dc9624c3b9c9');


-- --
-- -- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
-- --



-- --
-- -- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
-- --

-- INSERT INTO "drizzle"."__drizzle_migrations" ("id", "hash", "created_at") VALUES
-- 	(1, 'ab26e109bbd5d75e80d34fb1db301558fa9a57adc762eedb7b21310255f22fc7', 1726830065550),
-- 	(2, 'ff6cd907c35d0826b6c0ee64657354d871dee1b181360f1ab8d0be1d11be1739', 1726831772953);


-- --
-- -- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
-- --

-- INSERT INTO "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") VALUES
-- 	('f681a6a5-9c66-448a-99c2-fedf63387854', 'valid', '2024-09-20 15:29:24.816812+00', NULL, 'aead-det', 1, '\x7067736f6469756d', NULL, '', NULL, NULL, NULL, NULL, NULL),
-- 	('339d83d1-5db1-4a6e-951d-87691dac3b35', 'valid', '2024-09-20 15:29:24.816812+00', NULL, 'aead-det', 2, '\x7067736f6469756d', NULL, '', NULL, NULL, NULL, NULL, NULL),
-- 	('be8e0bd4-9020-45eb-aac1-3261348052ff', 'valid', '2024-09-20 15:31:47.434626+00', NULL, 'aead-det', 3, '\x7067736f6469756d', NULL, '', NULL, NULL, NULL, NULL, NULL),
-- 	('d8333d5f-9566-4123-b6f8-26429e829f49', 'valid', '2024-09-20 15:32:09.043806+00', NULL, 'aead-det', 4, '\x7067736f6469756d', NULL, '', NULL, NULL, NULL, NULL, NULL);


-- --
-- -- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
-- --

-- INSERT INTO "public"."accounts" ("id", "user_id") VALUES
-- 	('fada764e-dafa-44b8-bc40-4fba687bee37', '104482f8-6a89-411f-bda6-decfeab93e1b'),
-- 	('24015289-a6a4-4ab9-8f46-44bf1b3b34be', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc');


-- --
-- -- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
-- --

-- INSERT INTO "public"."projects" ("id", "name", "created_at", "updated_at") VALUES
-- 	('82dca80d-b6e2-4929-8ca8-8252d91a1f40', 'Default Project', '2024-09-20 15:31:47.434626+00', '2024-09-20 15:31:47.434626+00'),
-- 	('084d6083-7fc3-4175-a6fd-ce37191b2fe4', 'Default Project', '2024-09-20 15:32:09.043806+00', '2024-09-20 15:32:09.043806+00');


-- --
-- -- Data for Name: accounts_to_projects; Type: TABLE DATA; Schema: public; Owner: postgres
-- --

-- INSERT INTO "public"."accounts_to_projects" ("account_id", "project_id") VALUES
-- 	('fada764e-dafa-44b8-bc40-4fba687bee37', '82dca80d-b6e2-4929-8ca8-8252d91a1f40'),
-- 	('24015289-a6a4-4ab9-8f46-44bf1b3b34be', '084d6083-7fc3-4175-a6fd-ce37191b2fe4');


-- --
-- -- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
-- --



-- --
-- -- Data for Name: figma_resources; Type: TABLE DATA; Schema: public; Owner: postgres
-- --



-- --
-- -- Data for Name: integrations; Type: TABLE DATA; Schema: public; Owner: postgres
-- --



-- --
-- -- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
-- --



-- --
-- -- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
-- --



-- --
-- -- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
-- --



-- --
-- -- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
-- --



-- --
-- -- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
-- --



-- --
-- -- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
-- --

-- INSERT INTO "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") VALUES
-- 	('8d262c35-eb10-4be8-99e1-ec64373ee70e', 'project_api_key_secret', '', 'K5EuKotoMj0b3Q22BK7bufNKX2/Lo+S1X7iNY2Oa0S4bPrJW1Ekxih1DPPZBxqw5b/xXiHxJC/JK
-- pzJWGlsaJxDyztdqKnyqUVKrKUXIoFnZuR4Qw4oQW0cuZlo/L+Tr9reRuf5uuE7HzTtyujoA0n8u
-- 8vq0cd/dH0/p1ElqrbqHDBw5a7hisBAdrPuCNNozDPRiKIGGE2OtNGEQE9xGiQ==', 'f681a6a5-9c66-448a-99c2-fedf63387854', '\xc4a4fd1302c7aedb8669f7d64332d9f4', '2024-09-20 15:29:24.816812+00', '2024-09-20 15:29:24.816812+00'),
-- 	('cc3b38a7-28a7-4ae7-b76a-f618e03f69cb', 'project_jwt_secret', '', 'gxE7E3L/CHWyCVOF3piMKRBhZmEwjttkgYRWjAj+1+kNrifAEl4ecAJpw2anco0SXL13+pKWEjoc
-- KXIJVg0GTeWTrrqn0rBpogngT6RW25i3djIjV2pUcHS/VQP9pGjT', '339d83d1-5db1-4a6e-951d-87691dac3b35', '\xe0efb3fb92dc8e493b0d8592f839b9dd', '2024-09-20 15:29:24.816812+00', '2024-09-20 15:29:24.816812+00'),
-- 	('89da25af-41ee-48fc-a382-143ddd3dd845', '104482f8-6a89-411f-bda6-decfeab93e1b', '', 'fTS1aWJwWK9ForhFnc/Fzq/h5kEBZMMX+Q7fosQebmfftZioDcanJf4uHnCPrEuLGSRGSL0WhZ93
-- g3ylQuSPKzDb01IMK6o/yHpgdfqIMNW9wXiim4lsF96GrdvfiPy4VhAu6Y/WR7NDs2AC3nHQN56f
-- qHHffp2eS6CrwLlMk61CYIypF0hZZL0rgVM+rQ2CxXQQKQ4x8Ol7iHL9ZZ/LsQ==', 'be8e0bd4-9020-45eb-aac1-3261348052ff', '\x16f556a0109f47bc7d019ba199b2e347', '2024-09-20 15:31:47.434626+00', '2024-09-20 15:31:47.434626+00'),
-- 	('9bfbc9ed-458c-45c8-b05e-c9a87a25c144', '9e55f9b4-29c6-4094-b4a2-c061c477a4dc', '', '0iukMgrD9OpbKDrCMXaDLT/bUjzf2PmvJ/s8hdbVtzdGtxzYGXEYn43NvymVTayt32oenmsfQkHR
-- 9AtoX48/s1ey0eONddqEiwKyykZPZD5KFa+eA7mOD+l45TiSSZ5kkzEdHwVyWIYrKa8FZrfzKab3
-- AptfovVsw904zcn80VsFYQ93TaQxXMM0XNGniYMam8eqiqBmN3d+jxnn5oS0AA==', 'd8333d5f-9566-4123-b6f8-26429e829f49', '\x79b3569c262e455763dc6d85bb77a75c', '2024-09-20 15:32:09.043806+00', '2024-09-20 15:32:09.043806+00');


-- --
-- -- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
-- --

-- SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 4, true);


-- --
-- -- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
-- --

-- SELECT pg_catalog.setval('"drizzle"."__drizzle_migrations_id_seq"', 2, true);


-- --
-- -- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
-- --

-- SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 4, true);


-- --
-- -- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
-- --

-- SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


-- --
-- -- PostgreSQL database dump complete
-- --

-- RESET ALL;
