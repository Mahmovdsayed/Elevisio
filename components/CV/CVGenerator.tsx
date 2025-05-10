'use client';

import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Link } from '@react-pdf/renderer';

Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2', fontWeight: 'normal' },
        { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2', fontWeight: 'bold' },
    ],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
        lineHeight: 1,
    },
    header: {
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 6,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        textTransform: 'uppercase',
        marginBottom: 25,
    },
    contactRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: 11,
        color: '#000000',
        marginBottom: 2,
    },
    section: {
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 3,
        textTransform: 'uppercase',
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000',
        paddingBottom: 1,
    },
    line: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000',
        paddingBottom: 1,


    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
    },
    itemSubtitle: {
        fontSize: 11,
        color: '#000000',
        fontStyle: 'italic',
    },
    itemDate: {
        fontSize: 10,
        color: '#000000',
    },
    itemContent: {
        fontSize: 11,
        color: '#252525',
        fontWeight: 300,
        marginBottom: 2,
        textAlign: 'justify',
    },
    bulletList: {
        marginLeft: 8,
    },
    bulletItem: {
        fontSize: 10,
        marginBottom: 1,
        flexDirection: 'row',
    },
    bulletPoint: {
        width: 8,
        fontSize: 10,
    },
    bulletText: {
        fontSize: 10,
    },
    skillsContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    skillRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillCategory: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 2,
        width: '100%',
    },
    skillTag: {
        fontSize: 10,
        paddingHorizontal: 4,
    },
    projectLink: {
        fontSize: 9,
        textDecoration: 'none',
        marginTop: 1,
    },
    projectContainer: {
        marginBottom: 15,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    projectTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    projectDate: {
        fontSize: 10,
        color: '#555',
    },
    projectDescription: {
        fontSize: 10,
        marginBottom: 5,
        textAlign: 'justify',
    },
    technologies: {
        fontSize: 9,
        marginBottom: 5,
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    }
});


const ProfessionalCVGenerator = ({ cvData }: { cvData: any }) => {
    const filteredLinks = cvData.personalInfo.socialLinks?.filter((link: any) =>
        ['github', 'linkedin', 'behance'].includes(link.platform.toLowerCase())
    ) || [];

    return (
        <Document creator='Elevisio' pageMode='fullScreen' language='en-US'
            author='Elevisio' title={cvData.personalInfo.fullName
                .split(' ')
                .map((word: string) =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join('-')
                + '-CV'
            }>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{cvData.personalInfo.fullName.toUpperCase()}</Text>

                    <View style={styles.contactRow}>
                        <Text><Text style={{ fontWeight: "bold" }}>Phone:</Text> {cvData.personalInfo.phone}</Text>
                        <Text><Text style={{ fontWeight: "bold" }}>Email:</Text> {cvData.personalInfo.email}</Text>
                        <Text><Text style={{ fontWeight: "bold" }}>Location:</Text> {cvData.personalInfo.location}</Text>
                        <Text><Text style={{ fontWeight: "bold" }}>Position:</Text> {cvData.personalInfo.position}</Text>
                    </View>

                    {filteredLinks.length > 0 && (
                        <View style={{
                            flexDirection: 'row', marginTop: 3, gap: 6
                        }}>
                            {filteredLinks.map((link: any, i: number) => (
                                <Link key={i} src={link.url} style={{ fontSize: 11 }}>
                                    {link.platform.toLowerCase() === 'linkedin' ? 'LinkedIn' :
                                        link.platform.toLowerCase() === 'github' ? 'GitHub' :
                                            link.platform}
                                </Link>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.itemContent}>{cvData.personalInfo.about}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>{cvData.educations[0].institution}</Text>
                        <Text style={styles.itemDate}>
                            {cvData.educations[0].duration}
                        </Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{cvData.educations[0].degree}</Text>
                    {cvData.educations[0].description && (
                        <Text style={styles.itemContent}>{cvData.educations[0].description}</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {cvData.experiences.map((exp: any, index: number) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{exp.position}</Text>
                                <Text style={styles.itemDate}>
                                    {exp.duration}
                                </Text>
                            </View>
                            <Text style={styles.itemSubtitle}>{exp.company} | {exp.employmentType}</Text>
                            {exp.description && (
                                <View style={styles.bulletList}>
                                    <View style={styles.bulletItem}>
                                        <Text style={styles.bulletPoint}>•</Text>
                                        <Text style={styles.bulletText}>{exp.description}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    <View style={styles.skillsContainer}>
                        {Object.entries(cvData.skills).map(([category, skills]: [string, any]) => (
                            <View key={category} style={{ marginBottom: 2 }}>
                                <Text style={styles.skillCategory}>
                                    {category.replace('-', ' ').toUpperCase()}
                                </Text>
                                <View style={styles.skillRow}>
                                    {skills.map((skill: string, i: number) => (
                                        <Text key={i} style={styles.skillTag}>
                                            {skill}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PROJECTS</Text>

                    {cvData.projects.map((project: any, index: number) => {
                        const technologies = typeof project.technologies === 'string'
                            ? JSON.parse(project.technologies)
                            : project.technologies || [];

                        return (
                            <View key={index} style={styles.projectContainer}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectTitle}>{project.name}</Text>
                                    {project.duration && (
                                        <Text style={styles.projectDate}>
                                            {project.duration}
                                        </Text>
                                    )}
                                </View>

                                {project.description && (
                                    <Text style={styles.projectDescription}>
                                        {project.description}
                                    </Text>
                                )}

                                {technologies.length > 0 && (
                                    <Text style={styles.technologies}>
                                        <Text style={{ fontWeight: 'bold' }}>Technologies: </Text>
                                        {Array.isArray(technologies)
                                            ? technologies.join(', ')
                                            : project.technologies}
                                    </Text>
                                )}

                                {project.links?.length > 0 && (
                                    <View style={styles.linksContainer}>
                                        {project.links.map((link: any, linkIndex: number) => (
                                            <Link
                                                key={linkIndex}
                                                src={link.url}
                                                style={styles.projectLink}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </View>
                                )}

                                {index < cvData.projects.length - 1 && (
                                    <View style={styles.separator} />
                                )}
                            </View>
                        );
                    })}
                </View>

                {cvData.certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {cvData.certifications.map((cert: any, i: number) => (
                            <View key={i} style={{ marginBottom: 5 }}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemTitle}>{cert.name}</Text>
                                    <Text style={styles.itemDate}>Issued: {cert.date}</Text>
                                </View>
                                {cert.credentialUrl && (
                                    <Link src={cert.credentialUrl} style={styles.projectLink}>
                                        View Certificate
                                    </Link>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ProfessionalCVGenerator;


